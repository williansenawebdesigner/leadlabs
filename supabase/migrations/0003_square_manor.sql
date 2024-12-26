/*
  # Fix User Table Policies

  1. Changes
    - Update RLS policies for users table to allow proper user creation
    - Add policy for authenticated users to insert their own record
    - Add policy for authenticated users to update their own record

  2. Security
    - Maintains data isolation between users
    - Allows users to manage their own records
    - Prevents unauthorized access
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can read own data" ON users;

-- Create comprehensive policies for users table
CREATE POLICY "Users can manage own data"
  ON users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to insert their own record
CREATE POLICY "Users can insert own record"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow authenticated users to read their own record
CREATE POLICY "Users can read own record"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);
