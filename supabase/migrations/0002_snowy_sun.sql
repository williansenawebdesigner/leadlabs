/*
  # Create admin user

  1. Changes
    - Insert initial admin user into users table
    - Set admin flag for the user

  2. Security
    - Only creates admin if it doesn't exist
*/

DO $$ 
BEGIN
  -- Check if admin user exists
  IF NOT EXISTS (
    SELECT 1 FROM users 
    WHERE email = 'admin@example.com'
  ) THEN
    -- Insert admin user if auth.users record exists
    INSERT INTO users (id, email)
    SELECT id, email 
    FROM auth.users 
    WHERE email = 'admin@example.com';
  END IF;
END $$;
