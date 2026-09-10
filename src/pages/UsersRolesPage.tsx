import React, { useState } from 'react';
import { Shield, Search, Scale, FlaskConical, Eye, BookOpen, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { mockUsers } from '../data/mockData';

const rolesList = [
  { name: 'Administrator', icon: Shield, desc: 'Full system access and user management' },
  { name: 'Investigation Officer', icon: Search, desc: 'Access to cases and evidence management' },
  { name: 'Legal Officer', icon: Scale, desc: 'Review evidence and legal document access' },
  { name: 'Forensic Officer', icon: FlaskConical, desc: 'Upload and manage forensic reports' },
  { name: 'Auditor', icon: Eye, desc: 'View system logs and audit trails' },
  { name: 'Read Only', icon: BookOpen, desc: 'View-only access to authorized documents' },
];

export default function UsersRolesPage() {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedUser(expandedUser === id ? null : id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className="badge badge-success">Active</span>;
      case 'Inactive': return <span className="badge badge-neutral">Inactive</span>;
      case 'Suspended': return <span className="badge badge-error">Suspended</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const renderPermissionMatrix = () => (
    <div className="bg-gray-50 p-4 border-t border-gray-200">
      <h4 className="font-semibold text-navy-900 mb-3">Effective Permissions Matrix</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-navy-700">
            <tr>
              <th className="px-4 py-2 border-b">Module</th>
              <th className="px-4 py-2 border-b text-center">View</th>
              <th className="px-4 py-2 border-b text-center">Upload</th>
              <th className="px-4 py-2 border-b text-center">Edit</th>
              <th className="px-4 py-2 border-b text-center">Delete</th>
              <th className="px-4 py-2 border-b text-center">Download</th>
              <th className="px-4 py-2 border-b text-center">Share</th>
              <th className="px-4 py-2 border-b text-center">Audit</th>
            </tr>
          </thead>
          <tbody>
            {['Cases', 'Evidence', 'Forensics', 'Legal Docs', 'System Settings'].map((module, idx) => {
              const canView = true;
              const isAudit = module === 'System Settings';
              const canEdit = !isAudit && idx % 2 === 0;
              return (
                <tr key={module} className="border-b border-gray-100 bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-navy-800">{module}</td>
                  <td className="px-4 py-2"><div className="flex justify-center">{canView ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{canEdit ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{canEdit ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{!isAudit && idx === 0 ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{canView ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{canEdit ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                  <td className="px-4 py-2"><div className="flex justify-center">{isAudit ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}</div></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">User & Access Management</h1>
        <p className="text-navy-600">Manage user accounts, roles, and system permissions</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">System Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rolesList.map(role => (
            <div key={role.name} className="govt-card p-4 flex items-start space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg text-govt-blue shrink-0">
                <role.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-navy-900">{role.name}</h3>
                <p className="text-sm text-navy-600 mt-1">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="govt-card overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-semibold text-navy-900">User Accounts</h2>
          <button className="govt-btn-primary text-sm py-1.5">Add New User</button>
        </div>
        <div className="overflow-x-auto">
          <table className="govt-table w-full">
            <thead>
              <tr>
                <th className="w-8"></th>
                <th>User ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <React.Fragment key={user.id}>
                  <tr 
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${expandedUser === user.id ? 'bg-gray-50' : ''}`}
                    onClick={() => toggleExpand(user.id)}
                  >
                    <td className="text-gray-400">
                      {expandedUser === user.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </td>
                    <td className="font-mono text-sm text-navy-600">{user.id}</td>
                    <td className="font-medium text-navy-900">
                      <div>{user.name}</div>
                      <div className="text-xs text-navy-500 font-normal">{user.email}</div>
                    </td>
                    <td>{user.designation}</td>
                    <td>{user.department}</td>
                    <td><span className="badge badge-neutral">{user.role}</span></td>
                    <td className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</td>
                    <td>{getStatusBadge(user.status)}</td>
                  </tr>
                  {expandedUser === user.id && (
                    <tr>
                      <td colSpan={8} className="p-0 border-b border-gray-200">
                        {renderPermissionMatrix()}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
