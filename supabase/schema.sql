-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes table
CREATE TABLE themes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    configuration JSONB DEFAULT '{}'::jsonb
);

-- Weddings table
CREATE TABLE weddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    slug TEXT UNIQUE NOT NULL,
    bride_name TEXT NOT NULL,
    groom_name TEXT NOT NULL,
    wedding_date TIMESTAMPTZ,
    invitation_message TEXT,
    cover_image_url TEXT,
    couple_image_url TEXT,
    music_url TEXT,
    theme_id TEXT REFERENCES themes(id),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    venue_name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    maps_url TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Gallery Images table
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests table
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    invitation_token TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs table
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    email TEXT,
    attendance TEXT NOT NULL CHECK (attendance IN ('attending', 'not_attending')),
    guest_count INTEGER DEFAULT 1,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Themes: Everyone can view themes
CREATE POLICY "Themes are viewable by everyone" ON themes FOR SELECT USING (true);

-- Weddings: Owners can do everything; public can view if published
CREATE POLICY "Weddings are viewable by public if published" ON weddings FOR SELECT USING (published = true);
CREATE POLICY "Owners can view own weddings" ON weddings FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "Owners can insert own weddings" ON weddings FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update own weddings" ON weddings FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can delete own weddings" ON weddings FOR DELETE USING (auth.uid() = owner_id);

-- Events: Public can view if wedding is published; Owners can manage
CREATE POLICY "Events viewable by public if wedding published" ON events FOR SELECT USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = events.wedding_id AND weddings.published = true)
);
CREATE POLICY "Owners can manage events" ON events FOR ALL USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = events.wedding_id AND weddings.owner_id = auth.uid())
);

-- Gallery Images: Public can view if wedding is published; Owners can manage
CREATE POLICY "Gallery images viewable by public if wedding published" ON gallery_images FOR SELECT USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = gallery_images.wedding_id AND weddings.published = true)
);
CREATE POLICY "Owners can manage gallery images" ON gallery_images FOR ALL USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = gallery_images.wedding_id AND weddings.owner_id = auth.uid())
);

-- Guests: Only owners can view/manage guests
CREATE POLICY "Owners can manage guests" ON guests FOR ALL USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = guests.wedding_id AND weddings.owner_id = auth.uid())
);

-- RSVPs: Owners can view/manage; Public can insert (with basic validation if needed)
CREATE POLICY "Owners can view RSVPs" ON rsvps FOR SELECT USING (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = rsvps.wedding_id AND weddings.owner_id = auth.uid())
);
CREATE POLICY "Public can insert RSVPs for published weddings" ON rsvps FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM weddings WHERE weddings.id = rsvps.wedding_id AND weddings.published = true)
);
