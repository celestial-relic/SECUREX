// ===== Case Types =====
export type CasePriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type CaseStatus = 'Active' | 'Under Investigation' | 'Review' | 'Closed' | 'Pending';
export type CaseCategory = 'Women Safety' | 'Cyber Crime' | 'Economic Offence' | 'Narcotics' | 'Missing Person' | 'General';

export interface CaseRecord {
  id: string;
  title: string;
  category: CaseCategory;
  investigatingOfficer: string;
  officerId: string;
  priority: CasePriority;
  status: CaseStatus;
  lastUpdated: string;
  state: string;
  district: string;
  department: string;
  firDate: string;
  summary: string;
  relatedDocuments: string[];
  relatedEvidence: string[];
  assignedOfficers: OfficerBrief[];
  timeline: CaseTimelineEvent[];
  persons: PersonOfInterest[];
}

export interface OfficerBrief {
  name: string;
  designation: string;
  department: string;
  role: string;
}

export interface CaseTimelineEvent {
  date: string;
  title: string;
  description: string;
  user: string;
}

export interface PersonOfInterest {
  name: string;
  role: string;
  age?: number;
  gender?: string;
  relation?: string;
  status: string;
}

// ===== Document Types =====
export type DocumentClassification = 'CONFIDENTIAL' | 'RESTRICTED' | 'SECRET' | 'INTERNAL' | 'PUBLIC';
export type IntegrityStatus = 'VERIFIED' | 'PENDING' | 'FAILED';

export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  caseId: string;
  classification: DocumentClassification;
  uploadedBy: string;
  date: string;
  integrity: IntegrityStatus;
  fileSize: string;
  sha256: string;
  signedBy?: string;
  signatureValid?: boolean;
  chainOfCustody: ChainOfCustodyEntry[];
}

export interface ChainOfCustodyEntry {
  timestamp: string;
  user: string;
  department: string;
  action: string;
  status: 'Verified' | 'Authorized' | 'Pending' | 'Rejected';
}

// ===== Evidence Types =====
export type EvidenceType = 'Photograph' | 'Digital Device Image' | 'Physical' | 'Document' | 'Audio/Video' | 'Biological';
export type EvidenceStatus = 'In Custody' | 'Forensic Analysis' | 'Returned' | 'Court Submitted' | 'Disposed';

export interface EvidenceRecord {
  id: string;
  caseId: string;
  type: EvidenceType;
  description: string;
  collectedBy: string;
  date: string;
  integrity: IntegrityStatus;
  status: EvidenceStatus;
  location?: string;
  chainOfCustody: ChainOfCustodyEntry[];
}

// ===== Audit Types =====
export type AuditAction = 'VIEW' | 'DOWNLOAD' | 'UPLOAD' | 'EDIT' | 'DELETE' | 'SHARE' | 'LOGIN' | 'LOGOUT' | 'SIGN';
export type AuditResult = 'AUTHORIZED' | 'BLOCKED' | 'FAILED' | 'PENDING';

export interface AuditEntry {
  timestamp: string;
  user: string;
  department: string;
  action: AuditAction;
  resource: string;
  ip: string;
  result: AuditResult;
  caseId?: string;
}

// ===== User Types =====
export type UserRole = 'Administrator' | 'Investigation Officer' | 'Legal Officer' | 'Forensic Officer' | 'Auditor' | 'Read Only';

export interface UserRecord {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: UserRole;
  email: string;
  lastLogin: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  permissions: Permission[];
}

export interface Permission {
  module: string;
  view: boolean;
  upload: boolean;
  edit: boolean;
  delete: boolean;
  download: boolean;
  share: boolean;
  audit: boolean;
}

// ===== Security Types =====
export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'UNDER REVIEW' | 'RESOLVED' | 'ESCALATED';
  timestamp: string;
  source: string;
}

// ===== Activity Types =====
export interface ActivityEntry {
  timestamp: string;
  title: string;
  description: string;
  type: 'upload' | 'access' | 'share' | 'sign' | 'alert' | 'login';
}

// ===== Report Types =====
export interface ReportDefinition {
  id: string;
  title: string;
  description: string;
  category: string;
  lastGenerated?: string;
  frequency: string;
}

// ===== Secure Sharing =====
export interface SecureShareRequest {
  caseId: string;
  documentId: string;
  recipientDepartment: string;
  permission: 'VIEW ONLY' | 'VIEW & DOWNLOAD' | 'FULL ACCESS';
  expiration: string;
  watermark: boolean;
  downloadPermission: boolean;
}

export interface SecureShareResult {
  accessId: string;
  encryption: boolean;
  auditLogging: boolean;
  expiration: string;
  recipient: string;
}

// ===== Search =====
export interface SearchResult {
  type: 'case' | 'document' | 'evidence' | 'person' | 'location';
  id: string;
  title: string;
  subtitle: string;
  relevance: number;
}

// ===== Navigation =====
export interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

// ===== Auth =====
export interface AuthUser {
  id: string;
  name: string;
  designation: string;
  department: string;
  role: UserRole;
}
