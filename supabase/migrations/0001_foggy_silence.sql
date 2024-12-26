/*
  # Initial Schema Setup for Lead Tracking System

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    
    - `campaigns`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `capture_url` (text)
      - `thank_you_url` (text)
      - `created_at` (timestamp)
    
    - `page_views`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `visitor_id` (text)
      - `page_type` (text) - 'capture' or 'thank_you'
      - `is_conversion` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  name text NOT NULL,
  capture_url text NOT NULL,
  thank_you_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) NOT NULL,
  visitor_id text NOT NULL,
  page_type text NOT NULL CHECK (page_type IN ('capture', 'thank_you')),
  is_conversion boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can manage own campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read page views for own campaigns"
  ON page_views
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = page_views.campaign_id
      AND campaigns.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create page views"
  ON page_views
  FOR INSERT
  TO anon
  WITH CHECK (true);
