import os
import cv2
import numpy as np
from PIL import Image
from shapely.geometry import Polygon
import trimesh

def create_white_robix_glb():
    img_path = 'public/logos/robix-logo.png'
    output_glb_path = 'public/models/robix-logo.glb'
    os.makedirs('public/models', exist_ok=True)
    
    img_cv = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if img_cv is None:
        raise FileNotFoundError(f"Cannot load image from {img_path}")
        
    H, W, C = img_cv.shape
    bgr = img_cv[:, :, :3]
    alpha = img_cv[:, :, 3]
    r, g, b = bgr[:, :, 2], bgr[:, :, 1], bgr[:, :, 0]
    
    # Identify CRCE text and slits in 'o' so they stay sharp and readable
    crce_letters = np.zeros_like(alpha, dtype=bool)
    crce_letters[80:160, 680:960] = (alpha[80:160, 680:960] > 100) & (r[80:160, 680:960] > 180) & (g[80:160, 680:960] > 180) & (b[80:160, 680:960] > 180)
    
    o_slits = np.zeros_like(alpha, dtype=bool)
    o_slits[150:310, 300:450] = (alpha[150:310, 300:450] > 100) & (r[150:310, 300:450] > 160) & (g[150:310, 300:450] < 100)
    
    # Create brilliant white texture with dark graphite embossed lettering/slits
    white_rgb = np.full((H, W, 3), 255, dtype=np.uint8)
    graphite = np.array([28, 30, 36], dtype=np.uint8)
    white_rgb[crce_letters] = graphite
    white_rgb[o_slits] = graphite
    
    # Dilate mask for clean edges
    mask = (alpha > 40).astype(np.uint8) * 255
    kernel = np.ones((5, 5), np.uint8)
    dilated_mask = cv2.dilate(mask, kernel, iterations=2)
    
    # Front texture (RGBA)
    front_rgba = np.dstack([
        white_rgb,
        np.maximum(alpha, (dilated_mask > 0).astype(np.uint8) * 255)
    ])
    front_tex = Image.fromarray(front_rgba)
    
    # Back texture (mirrored)
    back_rgba = np.fliplr(front_rgba)
    back_tex = Image.fromarray(back_rgba)
    
    # 2. Extract accurate contours
    _, thresh = cv2.threshold(alpha, 120, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_TC89_KCOS)
    
    polygons = []
    all_pts = []
    for c in contours:
        area = cv2.contourArea(c)
        if area > 100:
            approx = cv2.approxPolyDP(c, 0.8, True).reshape(-1, 2)
            polygons.append(approx)
            all_pts.extend(approx)
            
    all_pts = np.array(all_pts)
    min_x, min_y = all_pts.min(axis=0)
    max_x, max_y = all_pts.max(axis=0)
    
    cx = (min_x + max_x) / 2.0
    cy = (min_y + max_y) / 2.0
    total_w = max_x - min_x
    
    # Target 3D dimensions
    target_width = 3.4
    scale = target_width / total_w
    depth = 0.26
    half_d = depth / 2.0
    
    # 3. Build Front Cap (Normal Z = +1.0, facing user at +Z)
    front_verts = []
    front_uvs = []
    front_faces = []
    front_normals = []
    front_v_offset = 0
    
    for approx in polygons:
        # Convert to 3D XY (CCW winding in 3D)
        pts_3d_2d = np.zeros_like(approx, dtype=float)
        pts_3d_2d[:, 0] = (approx[:, 0] - cx) * scale
        pts_3d_2d[:, 1] = -(approx[:, 1] - cy) * scale
        poly = Polygon(pts_3d_2d)
        
        local_v, local_f = trimesh.creation.triangulate_polygon(poly, engine='earcut')
        
        v3d = np.hstack([local_v, np.full((len(local_v), 1), half_d)])
        
        # Calculate UV directly from original pixel coordinates
        px = (local_v[:, 0] / scale) + cx
        py = cy - (local_v[:, 1] / scale)
        uvs = np.zeros((len(local_v), 2), dtype=np.float32)
        uvs[:, 0] = np.clip(px / W, 0.0, 1.0)
        uvs[:, 1] = np.clip(1.0 - (py / H), 0.0, 1.0)
        
        front_verts.append(v3d)
        front_uvs.append(uvs)
        front_normals.append(np.tile([0.0, 0.0, 1.0], (len(local_v), 1)))
        # In CCW 3D, local_f has normal Z = +1.0
        front_faces.append(local_f + front_v_offset)
        front_v_offset += len(local_v)
        
    front_verts = np.vstack(front_verts)
    front_uvs = np.vstack(front_uvs)
    front_normals = np.vstack(front_normals)
    front_faces = np.vstack(front_faces)
    
    front_mat = trimesh.visual.material.PBRMaterial(
        name='RobixWhiteFront',
        baseColorTexture=front_tex,
        baseColorFactor=[1.0, 1.0, 1.0, 1.0],
        metallicFactor=0.10,
        roughnessFactor=0.25
    )
    front_mesh = trimesh.Trimesh(
        vertices=front_verts,
        faces=front_faces,
        vertex_normals=front_normals,
        visual=trimesh.visual.TextureVisuals(uv=front_uvs, material=front_mat),
        process=False
    )
    
    # 4. Build Back Cap (Normal Z = -1.0, facing backwards)
    back_verts = []
    back_uvs = []
    back_faces = []
    back_normals = []
    back_v_offset = 0
    
    for approx in polygons:
        pts_3d_2d = np.zeros_like(approx, dtype=float)
        pts_3d_2d[:, 0] = (approx[:, 0] - cx) * scale
        pts_3d_2d[:, 1] = -(approx[:, 1] - cy) * scale
        poly = Polygon(pts_3d_2d)
        
        local_v, local_f = trimesh.creation.triangulate_polygon(poly, engine='earcut')
        
        v3d = np.hstack([local_v, np.full((len(local_v), 1), -half_d)])
        
        px = (local_v[:, 0] / scale) + cx
        py = cy - (local_v[:, 1] / scale)
        uvs = np.zeros((len(local_v), 2), dtype=np.float32)
        uvs[:, 0] = np.clip(1.0 - (px / W), 0.0, 1.0)
        uvs[:, 1] = np.clip(1.0 - (py / H), 0.0, 1.0)
        
        back_verts.append(v3d)
        back_uvs.append(uvs)
        back_normals.append(np.tile([0.0, 0.0, -1.0], (len(local_v), 1)))
        # Flip winding for back face so normal points along -Z
        back_faces.append(np.fliplr(local_f) + back_v_offset)
        back_v_offset += len(local_v)
        
    back_verts = np.vstack(back_verts)
    back_uvs = np.vstack(back_uvs)
    back_normals = np.vstack(back_normals)
    back_faces = np.vstack(back_faces)
    
    back_mat = trimesh.visual.material.PBRMaterial(
        name='RobixWhiteBack',
        baseColorTexture=back_tex,
        baseColorFactor=[1.0, 1.0, 1.0, 1.0],
        metallicFactor=0.10,
        roughnessFactor=0.25
    )
    back_mesh = trimesh.Trimesh(
        vertices=back_verts,
        faces=back_faces,
        vertex_normals=back_normals,
        visual=trimesh.visual.TextureVisuals(uv=back_uvs, material=back_mat),
        process=False
    )
    
    # 5. Build Side Walls (Outward planar normals, crisp white pearl finish)
    side_verts = []
    side_normals = []
    side_faces = []
    side_v_offset = 0
    
    for approx in polygons:
        pts_3d_2d = np.zeros_like(approx, dtype=float)
        pts_3d_2d[:, 0] = (approx[:, 0] - cx) * scale
        pts_3d_2d[:, 1] = -(approx[:, 1] - cy) * scale
        n = len(pts_3d_2d)
        for i in range(n):
            p0 = pts_3d_2d[i]
            p1 = pts_3d_2d[(i + 1) % n]
            
            dx = p1[0] - p0[0]
            dy = p1[1] - p0[1]
            length = np.sqrt(dx*dx + dy*dy)
            if length < 1e-6:
                continue
            # CCW outward normal
            nx = dy / length
            ny = -dx / length
            
            v0 = [p0[0], p0[1], half_d]
            v1 = [p1[0], p1[1], half_d]
            v2 = [p1[0], p1[1], -half_d]
            v3 = [p0[0], p0[1], -half_d]
            
            side_verts.extend([v0, v1, v2, v3])
            side_normals.extend([[nx, ny, 0.0]] * 4)
            
            side_faces.append([side_v_offset, side_v_offset + 1, side_v_offset + 2])
            side_faces.append([side_v_offset, side_v_offset + 2, side_v_offset + 3])
            side_v_offset += 4
            
    side_verts = np.array(side_verts, dtype=np.float32)
    side_normals = np.array(side_normals, dtype=np.float32)
    side_faces = np.array(side_faces, dtype=np.int32)
    
    side_mat = trimesh.visual.material.PBRMaterial(
        name='RobixWhiteSides',
        baseColorFactor=[0.93, 0.94, 0.97, 1.0],
        metallicFactor=0.15,
        roughnessFactor=0.28
    )
    side_mesh = trimesh.Trimesh(
        vertices=side_verts,
        faces=side_faces,
        vertex_normals=side_normals,
        visual=trimesh.visual.TextureVisuals(material=side_mat),
        process=False
    )
    
    scene = trimesh.Scene({
        'front': front_mesh,
        'back': back_mesh,
        'sides': side_mesh
    })
    
    glb_data = scene.export(file_type='glb')
    with open(output_glb_path, 'wb') as f:
        f.write(glb_data)
        
    print(f"White GLB model regenerated successfully at: {output_glb_path}")
    print(f"File size: {len(glb_data) / 1024:.1f} KB")

if __name__ == '__main__':
    create_white_robix_glb()
