import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for user profile
  const [profile, setProfile] = useState({
    personal: {
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      dateOfBirth: '1995-06-15',
      gender: 'female'
    },
    addresses: [
      {
        id: 1,
        type: 'Home',
        name: 'Priya Sharma',
        phone: '+91 98765 43210',
        address: '123, Park Street',
        locality: 'Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        isDefault: true
      },
      {
        id: 2,
        type: 'Office',
        name: 'Priya Sharma',
        phone: '+91 98765 43210',
        address: '456, Business Park',
        locality: 'Andheri East',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400069',
        isDefault: false
      }
    ],
    preferences: {
      notifications: {
        email: true,
        sms: true,
        whatsapp: false
      },
      newsletter: true,
      language: 'english'
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handlePersonalInfoChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleNotificationChange = (channel) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [channel]: !prev.preferences.notifications[channel]
        }
      }
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleSetDefaultAddress = (addressId) => {
    setProfile(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    }));
  };

  const handleDeleteAddress = (addressId) => {
    setProfile(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== addressId)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setEditedProfile(profile);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit mr-2"></i>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['personal', 'addresses', 'preferences'].map((tab) => (
            <button
              key={tab}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.personal.firstName}
                    onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.personal.lastName}
                    onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 input-field"
                    value={editedProfile.personal.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 input-field"
                    value={editedProfile.personal.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    className="mt-1 input-field"
                    value={editedProfile.personal.dateOfBirth}
                    onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    className="mt-1 input-field"
                    value={editedProfile.personal.gender}
                    onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="btn-primary">
                  <i className="fas fa-plus mr-2"></i>
                  Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{address.type}</span>
                        {address.isDefault && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="text-red-400 hover:text-red-600"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{address.name}</p>
                      <p>{address.phone}</p>
                      <p>{address.address}</p>
                      <p>{address.locality}</p>
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                    </div>

                    {!address.isDefault && (
                      <button
                        className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
                        onClick={() => handleSetDefaultAddress(address.id)}
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.preferences.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.preferences.notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.preferences.notifications.whatsapp}
                      onChange={() => handleNotificationChange('whatsapp')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      WhatsApp Notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900">Newsletter</h3>
                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.preferences.newsletter}
                      onChange={() => setEditedProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          newsletter: !prev.preferences.newsletter
                        }
                      }))}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Subscribe to newsletter for latest updates and offers
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900">Language Preference</h3>
                <div className="mt-4">
                  <select
                    className="input-field"
                    value={editedProfile.preferences.language}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value
                      }
                    }))}
                    disabled={!isEditing}
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;