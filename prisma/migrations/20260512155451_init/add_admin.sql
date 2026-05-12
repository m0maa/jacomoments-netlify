-- Insert default admin user
-- Password: admin123 (in production, use bcrypt!)
INSERT INTO Admin (id, username, password)
VALUES ('admin-default-id', 'admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
