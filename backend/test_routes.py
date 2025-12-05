# Quick test script to check routes
from server import app

print("All routes in main app:")
for route in app.routes:
    print(f"  Type: {type(route).__name__}")
    if hasattr(route, 'path'):
        print(f"  Path: {route.path}")
    if hasattr(route, 'path_prefix'):
        print(f"  Path Prefix: {route.path_prefix}")
    if hasattr(route, 'routes'):
        print(f"  Sub-routes:")
        for sub_route in route.routes:
            if hasattr(sub_route, 'path'):
                methods = getattr(sub_route, 'methods', set())
                print(f"    {route.path_prefix}{sub_route.path} {methods}")
    print()

