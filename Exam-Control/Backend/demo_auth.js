const axios = require('axios');
const API = 'http://localhost:5000/api';

async function demo() {
    try {
        console.log('--- 🛡️ NEW STUDENT REGISTRATION ---');
        const reg = await axios.post(`${API}/auth/register`, {
            name: 'Vikash Kumar',
            email: 'vikash@gmail.com',
            password: 'password123',
            role: 'student',
            rollNo: 'VS2026-X',
            dept: 'Electronics',
            year: 'Year 2'
        });
        console.log('✅ Student Registered:', reg.data.name);

        console.log('\n--- 🔑 STUDENT LOGIN ---');
        const login = await axios.post(`${API}/auth/login`, {
            email: 'vikash@gmail.com',
            password: 'password123'
        });
        console.log('✅ Status: 200 OK');
        console.log('✅ JWT Token Issued:', login.data.token.substring(0, 30) + '...');
        console.log('✅ User Role:', login.data.role);

        console.log('\n--- 👤 GET SECURE PROFILE ---');
        const profile = await axios.get(`${API}/auth/profile`, { 
            headers: { Authorization: `Bearer ${login.data.token}` } 
        });
        console.log('✅ Verified Identity:', profile.data.name, `(${profile.data.rollNo})`);

        console.log('\n🌟 REGISTER AND LOGIN DEMO: SUCCESS!');
    } catch (err) {
        console.error('❌ DEMO FAILED:', err.response ? err.response.data : err.message);
    }
}

demo();
