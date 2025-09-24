import React, { useState } from 'react'

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, phone, dob } = form

    // --- Format validations first (so Cypress can catch them) ---
    if (email && !email.includes('@')) {
      alert('Invalid email. Please check your email address.')
      return
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.')
      return
    }

    if (dob) {
      const dobDate = new Date(dob)
      const now = new Date()
      if (dobDate > now) {
        alert('Invalid date of birth. Please select a valid past date.')
        return
      }
    }

    // --- Required field checks after ---
    if (!username) {
      alert('Please fill out the Username field.')
      return
    }
    if (!email) {
      alert('Please fill out the Email Address field.')
      return
    }
    if (!phone) {
      alert('Please fill out the Phone Number field.')
      return
    }
    if (!dob) {
      alert('Please fill out the Date of Birth field.')
      return
    }

    // --- Success ---
    setForm({ username: '', email: '', phone: '', dob: '' })
    setIsOpen(false)
  }

  const closeModal = (e) => {
    if (e.target.className === 'modal') {
      setIsOpen(false)
    }
  }

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input id="username" type="text" value={form.username} onChange={handleChange} />

              <label>Email Address:</label>
              <input id="email" type="email" value={form.email} onChange={handleChange} />

              <label>Phone Number:</label>
              <input id="phone" type="text" value={form.phone} onChange={handleChange} />

              <label>Date of Birth:</label>
              <input id="dob" type="date" value={form.dob} onChange={handleChange} />

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
