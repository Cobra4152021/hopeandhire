const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function runTests() {
  console.log('Starting tests...\n');

  // Test 1: Authentication
  console.log('Test 1: Authentication');
  try {
    const {
      data: { user: _user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'testpassword123',
    });
    if (error) throw error;
    console.log('✅ Authentication successful', _user);
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
  }

  // Test 2: Profile Management
  console.log('\nTest 2: Profile Management');
  try {
    const { data: _profile, error } = await supabase.from('profiles').select('*').single();
    if (error) throw error;
    console.log('✅ Profile retrieval successful', _profile);
  } catch (error) {
    console.error('❌ Profile retrieval failed:', error.message);
  }

  // Test 3: Job Search
  console.log('\nTest 3: Job Search');
  try {
    const { data: _jobs, error } = await supabase.from('jobs').select('*').limit(5);
    if (error) throw error;
    console.log('✅ Job search successful', _jobs);
  } catch (error) {
    console.error('❌ Job search failed:', error.message);
  }

  // Test 4: Job Application
  console.log('\nTest 4: Job Application');
  try {
    const { data: _application, error } = await supabase.from('applications').select('*').limit(1);
    if (error) throw error;
    console.log('✅ Job application retrieval successful', _application);
  } catch (error) {
    console.error('❌ Job application retrieval failed:', error.message);
  }

  // Test 5: Notifications
  console.log('\nTest 5: Notifications');
  try {
    const { data: _notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .limit(5);
    if (error) throw error;
    console.log('✅ Notifications retrieval successful', _notifications);
  } catch (error) {
    console.error('❌ Notifications retrieval failed:', error.message);
  }

  // Test 6: Settings
  console.log('\nTest 6: Settings');
  try {
    const { data: _settings, error } = await supabase.from('user_settings').select('*').single();
    if (error) throw error;
    console.log('✅ Settings retrieval successful', _settings);
  } catch (error) {
    console.error('❌ Settings retrieval failed:', error.message);
  }

  console.log('\nTests completed!');
}

runTests();
