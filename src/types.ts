/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  uid: string;
  memberId: string;
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  batch: string;
  department: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  photoUrl: string;
  role: 'Super Admin' | 'Admin' | 'Department Head' | 'Moderator' | 'Member';
  membershipStatus: 'Active' | 'Pending' | 'Expired';
  joinDate: string;
  membershipExpiry: string;
  profileCompletion: number;
}

export interface Complaint {
  id: string;
  userId: string;
  name: string;
  memberId: string;
  email: string;
  phone: string;
  subject: string;
  category: 'Membership' | 'Department' | 'Event' | 'Facility' | 'Technical' | 'Other';
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  attachmentUrl?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  capacity: number;
  registeredCount: number;
  category: 'Workshop' | 'Seminar' | 'Cultural' | 'Social' | 'Sports';
  seatsRemaining: number;
  status: 'Upcoming' | 'Ongoing' | 'Past';
}

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventVenue: string;
  ticketId: string;
  qrCode: string; // Base64 or mock scan code
  paymentStatus: 'Paid' | 'Free';
  status: 'Active' | 'Cancelled';
  seatNumber: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote?: string;
  facebook?: string;
  linkedin?: string;
  email?: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  banner: string;
  head: TeamMember;
  members: TeamMember[];
  responsibilities: string[];
  projects: { name: string; status: 'Ongoing' | 'Completed'; desc: string }[];
  achievements: string[];
  contactEmail: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Events' | 'Workshops' | 'Volunteers' | 'Awards' | 'Cultural Programs' | 'Seminars';
  date: string;
}
