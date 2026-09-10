# Secure Digital Document Management System for Legal and Investigation Documents

**Smart India Hackathon (SIH 2026)**  
**Problem Statement ID:** 26190  
**Ministry:** Ministry of Home Affairs  
**Department:** National Crime Records Bureau (NCRB), Women Safety Division  

---

## 🏛️ Project Overview

A modern, high-assurance digital investigation and evidence management portal designed specifically for Indian law enforcement, forensic divisions, and judicial workflows. It modernize police document management with end-to-end cryptographic integrity verification, digital chain of custody tracking, time-bounded secure sharing, role-based access control (RBAC), and responsible AI-assisted investigative intelligence.

> **Note:** This is an interactive frontend prototype built for the SIH 2026 Grand Finale demonstration using synthetic mock data. No real citizen or government credentials or police systems are connected.

---

## ⚡ Key Highlights & Features

- **Government Portal Visual Identity:** Built strictly in the visual language of the National Portal of India, Digital India, and NCRB (Ashoka Chakra emblem motif, deep navy `#003366`, government blue, saffron/green accents).
- **Accessibility & Bilingual Support:** Integrated `A-` / `A` / `A+` font scaling and Hindi / English UI toggles.
- **Unified Global Search:** Fast, categorized search across cases, documents, evidence, and personnel.
- **Flagship Case Workspace (`#NCRB-UP-2026-004821`):** Complete investigation hub with 6 interactive tabs:
  - *Overview*, *Documents*, *Evidence*, *Persons*, *Timeline*, and *Audit Trail*.
- **Cryptographic Sealing & Verification:**
  - Real-time **SHA-256 hash checksum** calculation.
  - **PKI Digital Signatures** compliance verification under Section 65B of the Indian Evidence Act & Bharatiya Sakshya Adhiniyam, 2023.
  - Interactive **Digital Chain of Custody** tracking every handover.
- **Responsible AI Document Intelligence:**
  - Extraction of entities (Persons, Locations, Dates, Evidence).
  - Identification of investigation keywords (CCTV, witnesses, forensics).
  - Executive case briefs accompanied by human-in-the-loop statutory legal disclaimers.
- **Inter-Departmental Secure Transfer:**
  - Time-bounded access tokens (1 hr – 7 days).
  - Recipient-specific access rights (*VIEW ONLY*, *VIEW & DOWNLOAD*, *FULL ACCESS*).
  - Dynamic forensic watermarking.
- **Immutable Forensic Audit Trail:**
  - Detailed audit logs capturing timestamps, user roles, actions (`VIEW`, `DOWNLOAD`, `SIGN`), target resources, masked IP addresses, and authorization status.
- **Security Center & Anomaly Detection:**
  - Real-time risk scoring, 92% security health index, and proactive alerts (e.g., bulk document access spikes).
- **Role-Based Access Control (RBAC):**
  - Granular permission matrices for Administrators, Investigation Officers, Legal Advisors, Forensic Experts, and Auditors.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 with TypeScript
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS v4 with custom Indian Government design tokens
- **Icons:** Lucide React
- **Routing:** React Router v7

---

## 🚀 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
cd <REPO_NAME>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev -- --host
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🎯 3-Minute SIH Demo Flow

1. **Login Portal (`/login`)**: Solve CAPTCHA (`10`) and log in as `Inspector Rajiv Sharma`.
2. **Dashboard (`/dashboard`)**: Review metric cards, live stream, and quick action launchpads.
3. **Case Workspace (`/cases/NCRB-UP-2026-004821`)**: Browse investigation timeline, witnesses, and officers.
4. **Document Viewer (`/documents/DOC-4821-001`)**:
   - Inspect FIR preview with watermark.
   - Verify SHA-256 integrity and digital signature.
   - Trace the Digital Chain of Custody.
   - Run AI-Assisted Document Analysis.
5. **Secure Transfer (`/secure-sharing`)**: Generate an encrypted, watermarked link for Forensic Science Laboratory.
6. **Audit & Threat Monitoring (`/audit-trail` & `/security`)**: Inspect forensic logs and the high-priority threat alert.
7. **Judge Guide (`/help`)**: View technical and statutory compliance details.

---

## 📄 License & Disclaimer

Developed for demonstration purposes during **Smart India Hackathon 2026**.  
All datasets, names, case IDs, and documents are entirely fictional.
