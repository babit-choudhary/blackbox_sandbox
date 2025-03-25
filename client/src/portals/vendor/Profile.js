import React, { useState } from 'react';

const Profile = () => {
  // Mock data for vendor profile
  const [profile, setProfile] = useState({
    businessInfo: {
      name: 'Ethnic Elegance',
      type: 'Boutique',
      description: 'Premium ethnic wear boutique specializing in designer sarees and traditional wear.',
      established: '2020',
      gstin: '27AAPFU0939F1ZV',
      panNumber: 'AAPFU0939F',
      website: 'www.ethnicelegance.com'
    },
    contactInfo: {
      email: 'contact@ethnicelegance.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      address: {
        street: '123, Fashion Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      }
    },
    bankInfo: {
      accountName: 'Ethnic Elegance Pvt Ltd',
      accountNumber: 'XXXX XXXX 1234',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      branch: 'Mumbai Main Branch'
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        whatsapp: false
      },
      autoAcceptOrders: false,
      showStockLevel: true,
      allowCustomization: true
    }
  });

  const [activeTab, setActiveTab] = useState('business');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (section, field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddressChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        address: {
          ...prev.contactInfo.address,
          [field]: value
        }
      }
    }));
  };

  const handleNotificationChange = (field) => {
    setEditedProfile(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        notifications: {
          ...prev.settings.notifications,
          [field]: !prev.settings.notifications[field]
        }
      }
    }));
  };

  const handleSettingChange = (field) => {
    setEditedProfile(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [field]: !prev.settings[field]
      }
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // TODO: API call to update profile
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Business Profile</h1>
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
          {['business', 'contact', 'banking', 'settings'].map((tab) => (
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {/* Business Information */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.name}
                    onChange={(e) => handleInputChange('businessInfo', 'name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Type</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.type}
                    onChange={(e) => handleInputChange('businessInfo', 'type', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Business Description</label>
                  <textarea
                    rows="4"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.description}
                    onChange={(e) => handleInputChange('businessInfo', 'description', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">GSTIN</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.gstin}
                    onChange={(e) => handleInputChange('businessInfo', 'gstin', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.panNumber}
                    onChange={(e) => handleInputChange('businessInfo', 'panNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.website}
                    onChange={(e) => handleInputChange('businessInfo', 'website', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Established Year</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.businessInfo.established}
                    onChange={(e) => handleInputChange('businessInfo', 'established', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 input-field"
                    value={editedProfile.contactInfo.email}
                    onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 input-field"
                    value={editedProfile.contactInfo.phone}
                    onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
                  <input
                    type="tel"
                    className="mt-1 input-field"
                    value={editedProfile.contactInfo.whatsapp}
                    onChange={(e) => handleInputChange('contactInfo', 'whatsapp', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Address</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      className="mt-1 input-field"
                      value={editedProfile.contactInfo.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      className="mt-1 input-field"
                      value={editedProfile.contactInfo.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      className="mt-1 input-field"
                      value={editedProfile.contactInfo.address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <input
                      type="text"
                      className="mt-1 input-field"
                      value={editedProfile.contactInfo.address.pincode}
                      onChange={(e) => handleAddressChange('pincode', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                      type="text"
                      className="mt-1 input-field"
                      value={editedProfile.contactInfo.address.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Banking Information */}
          {activeTab === 'banking' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.bankInfo.accountName}
                    onChange={(e) => handleInputChange('bankInfo', 'accountName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.bankInfo.accountNumber}
                    onChange={(e) => handleInputChange('bankInfo', 'accountNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.bankInfo.bankName}
                    onChange={(e) => handleInputChange('bankInfo', 'bankName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.bankInfo.ifscCode}
                    onChange={(e) => handleInputChange('bankInfo', 'ifscCode', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Branch</label>
                  <input
                    type="text"
                    className="mt-1 input-field"
                    value={editedProfile.bankInfo.branch}
                    onChange={(e) => handleInputChange('bankInfo', 'branch', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.settings.notifications.email}
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
                      checked={editedProfile.settings.notifications.sms}
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
                      checked={editedProfile.settings.notifications.whatsapp}
                      onChange={() => handleNotificationChange('whatsapp')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      WhatsApp Notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-medium text-gray-900">Store Settings</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.settings.autoAcceptOrders}
                      onChange={() => handleSettingChange('autoAcceptOrders')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Auto-accept Orders
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.settings.showStockLevel}
                      onChange={() => handleSettingChange('showStockLevel')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Show Stock Level to Customers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={editedProfile.settings.allowCustomization}
                      onChange={() => handleSettingChange('allowCustomization')}
                      disabled={!isEditing}
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Allow Product Customization
                    </label>
                  </div>
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