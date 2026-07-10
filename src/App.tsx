/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react'; // Sparkle Animation এর জন্য ইমপোর্ট করা হলো
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updatePassword
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  updateDoc 
} from 'firebase/firestore';
import { auth, db } from './firebase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import AboutView from './components/AboutView';
import LeadershipView from './components/LeadershipView';
import DepartmentView from './components/DepartmentView';
import ActivitiesView from './components/ActivitiesView';
import EventPortal from './components/EventPortal';
import GalleryView from './components/GalleryView';
import ContactView from './components/ContactView';
import ComplaintView from './components/ComplaintView';
import DashboardView from './components/DashboardView';
import AuthView from './components/AuthView';

import { UserProfile, Complaint, Ticket, AppNotification } from './types';

// ==========================================
// ১. গ্লোবাল স্পার্কল ব্যাকগ্রাউন্ড সাব-কম্পোনেন্ট
// ==========================================
interface SparkleParticle {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

function GlobalSparkleBackground() {
  const [particles, setParticles] = useState<SparkleParticle[]>([]);
  const colors = ['#38bdf8', '#818cf8', '#fbbf24', '#34d399', '#f472b6', '#ffffff'];

  useEffect(() => {
    // পুরো অ্যাপ স্ক্রিন জুড়ে র্যান্ডমলি ৫০টি ডাইনামিক স্পার্কল জেনারেট করা হচ্ছে
    const generated = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 6, // ৬px থেকে ১৮px সাইজ
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2, // ২ থেকে ৫ সেকেন্ড লাইফসাইকেল
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.svg
          key={p.id}
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 90, 180],
            y: [0, -40], // হালকা ওপরের দিকে ড্র্রিফট বা ফ্লোট ইফেক্ট
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            left: p.left,
            top: p.top,
            position: 'absolute',
            width: p.size,
            height: p.size,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))'
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"
            fill={p.color}
          />
        </motion.svg>
      ))}
    </div>
  );
}

// ==========================================
// ২. মেইন অ্যাপ কম্পোনেন্ট
// ==========================================
export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Authentication State
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Firestore Synchronized State
  const [registeredTickets, setRegisteredTickets] = useState<Ticket[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Monitor dark mode class change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Auth Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch matching UserProfile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        } else {
          // Build fallback profile if for some reason missing
          const fallbackProfile: UserProfile = {
            uid: firebaseUser.uid,
            memberId: 'BGI-' + Math.floor(10000 + Math.random() * 90000),
            fullName: firebaseUser.displayName || 'BGI Member',
            email: firebaseUser.email || '',
            phone: '01700000000',
            studentId: '23-00000-1',
            batch: '23',
            department: 'IT Node',
            bloodGroup: 'O+',
            address: 'Dhaka, Bangladesh',
            emergencyContact: '01700000000',
            photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
            role: 'Member',
            membershipStatus: 'Active',
            joinDate: new Date().toISOString(),
            membershipExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString(),
            profileCompletion: 80
          };
          await setDoc(userDocRef, fallbackProfile);
          setUserProfile(fallbackProfile);
        }
      } else {
        setUserProfile(null);
        setRegisteredTickets([]);
        setComplaints([]);
        setNotifications([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Synchronize Firestore collections in real-time when user logs in
  useEffect(() => {
    if (!user) return;

    // 1. Listen to Registrations
    const regQuery = query(collection(db, 'registrations'), where('userId', '==', user.uid));
    const unsubscribeReg = onSnapshot(regQuery, (snapshot) => {
      const tickets: Ticket[] = [];
      snapshot.forEach((doc) => {
        tickets.push({ id: doc.id, ...doc.data() } as Ticket);
      });
      setRegisteredTickets(tickets);
    }, (error) => {
      console.error('Error synchronizing registrations:', error);
    });

    // 2. Listen to Complaints
    const compQuery = query(collection(db, 'complaints'), where('userId', '==', user.uid));
    const unsubscribeComp = onSnapshot(compQuery, (snapshot) => {
      const list: Complaint[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Complaint);
      });
      setComplaints(list);
    }, (error) => {
      console.error('Error synchronizing complaints:', error);
    });

    // 3. Listen to Notifications
    const notQuery = query(collection(db, 'notifications'), where('userId', '==', user.uid));
    const unsubscribeNotif = onSnapshot(notQuery, (snapshot) => {
      const list: AppNotification[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as AppNotification);
      });
      setNotifications(list);
    }, (error) => {
      console.error('Error synchronizing notifications:', error);
    });

    return () => {
      unsubscribeReg();
      unsubscribeComp();
      unsubscribeNotif();
    };
  }, [user]);

  // Handle View Navigation
  const handleNavigate = (view: string) => {
    // Join Us ক্লিকে সরাসরি গুগল ফর্মে রিডাইরেক্ট করবে
    if (view === 'join' || view === 'auth-join') {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdO5TdKXWmAPXWrMTUL_uuoGUoA21ig8pLGMfSLPzNwBDhtOg/viewform', '_blank');
      return;
    }

    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sign In Trigger
  const handleLogin = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  // Onboarding Registration trigger
  const handleRegister = async (data: any) => {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Create Profile document in Firestore
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      memberId: 'BGI-' + Math.floor(10000 + Math.random() * 90000),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      studentId: data.studentId,
      batch: data.batch,
      department: data.department,
      bloodGroup: data.bloodGroup,
      address: data.address,
      emergencyContact: data.emergencyContact,
      photoUrl: data.photoUrl,
      role: 'Member',
      membershipStatus: 'Active',
      joinDate: new Date().toISOString(),
      membershipExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString(),
      profileCompletion: 100
    };

    await setDoc(doc(db, 'users', cred.user.uid), newProfile);
    setUserProfile(newProfile);

    // Write initial notification
    await addDoc(collection(db, 'notifications'), {
      userId: cred.user.uid,
      title: 'Welcome to BGI Community!',
      message: 'Your official BGI Membership card was generated successfully. Explore your dashboard and map emergency donor groups.',
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  // Password Recovery Reset trigger
  const handleResetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Sign Out trigger
  const handleLogout = async () => {
    await signOut(auth);
    handleNavigate('home');
  };

  // Register for Event trigger
  const handleRegisterEvent = async (event: any) => {
    if (!user) return;
    
    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    const seatNumber = 'S-' + Math.floor(1 + Math.random() * 80);

    const newTicket = {
      userId: user.uid,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      ticketId,
      qrCode: 'BGI-ENCRYPTED-AUTHENTICATED-SECTOKEN',
      status: 'Active',
      paymentStatus: 'Free',
      seatNumber,
      timestamp: new Date().toISOString()
    };

    await addDoc(collection(db, 'registrations'), newTicket);

    // Create Notification
    await addDoc(collection(db, 'notifications'), {
      userId: user.uid,
      title: 'Event Ticket Generated',
      message: `Successfully booked Seat ${seatNumber} for "${event.title}". Download your verified pass details inside the Event Portal.`,
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  // Submit Complaint ticket trigger
  const handleSubmitComplaint = async (complaintData: any) => {
    if (!user) return;
    await addDoc(collection(db, 'complaints'), {
      userId: user.uid,
      ...complaintData
    });

    // Create Notification
    await addDoc(collection(db, 'notifications'), {
      userId: user.uid,
      title: 'Complaint Docket Filed',
      message: `Your dispute ticket titled "${complaintData.subject}" is logged. Tracking progress now.`,
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  // Mark notification read trigger
  const handleMarkNotificationRead = async (id: string) => {
    const ref = doc(db, 'notifications', id);
    await updateDoc(ref, { read: true });
  };

  // Update Profile log trigger
  const handleUpdateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, { ...profileData, profileCompletion: 100 });
    setUserProfile(prev => prev ? { ...prev, ...profileData, profileCompletion: 100 } : null);
  };

  // Change password trigger
  const handleChangePassword = async (pass: string) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, pass);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(circle_at_0%_0%,rgba(99,102,241,0.05)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.05)_0%,transparent_50%)] dark:bg-[#020617] dark:bg-[radial-gradient(circle_at_0%_0%,#1e1b4b_0%,transparent_50%),radial-gradient(circle_at_100%_0%,#312e81_0%,transparent_50%),radial-gradient(circle_at_100%_100%,#1e1b4b_0%,transparent_50%),radial-gradient(circle_at_0%_100%,#4338ca_0%,transparent_50%),#020617] transition-colors duration-300 flex flex-col justify-between relative overflow-hidden z-0">
      
      {/* গ্লোবাল স্পার্কল ব্যাকগ্রাউন্ড লেয়ার */}
      <GlobalSparkleBackground />

      {/* Animated / Static Background Glowing Shapes matching the Frosted Glass theme */}
      <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Dynamic Navbar */}
      <Navbar 
        activeView={activeView}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        userProfile={userProfile}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Orchestrator Route Swapper Stage - Content elevated to z-10 over sparkles */}
      <main className="flex-grow pt-16 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <span className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
            <span className="text-xs font-mono tracking-widest text-indigo-500 uppercase">Synchronizing with BGI Secure Cluster</span>
          </div>
        ) : (
          <>
            {activeView === 'home' && (
              <Hero onNavigate={handleNavigate} />
            )}

            {activeView.startsWith('about-') && (
              <AboutView 
                initialSubView={activeView.split('-')[1] || 'know'} 
                onNavigate={handleNavigate} 
              />
            )}

            {activeView === 'leadership' && (
              <LeadershipView />
            )}

            {(activeView === 'departments' || activeView.startsWith('dept-')) && (
              <DepartmentView 
                initialDeptId={activeView.startsWith('dept-') ? activeView.split('-')[1] : undefined} 
              />
            )}

            {activeView === 'activities' && (
              <ActivitiesView />
            )}

            {activeView === 'events' && (
              <EventPortal 
                user={user}
                userProfile={userProfile}
                onNavigate={handleNavigate}
                registeredTickets={registeredTickets}
                onRegisterEvent={handleRegisterEvent}
              />
            )}

            {activeView === 'tickets' && (
              <EventPortal 
                user={user}
                userProfile={userProfile}
                onNavigate={handleNavigate}
                registeredTickets={registeredTickets}
                onRegisterEvent={handleRegisterEvent}
              />
            )}

            {activeView === 'gallery' && (
              <GalleryView />
            )}

            {activeView === 'contact' && (
              <ContactView />
            )}

            {activeView === 'complaint' && (
              <ComplaintView 
                user={user}
                userProfile={userProfile}
                onNavigate={handleNavigate}
                complaints={complaints}
                onSubmitComplaint={handleSubmitComplaint}
              />
            )}

            {activeView === 'dashboard' && user && (
              <DashboardView 
                user={user}
                userProfile={userProfile}
                notifications={notifications}
                onMarkNotificationRead={handleMarkNotificationRead}
                onUpdateProfile={handleUpdateProfile}
                onChangePassword={handleChangePassword}
              />
            )}

            {activeView === 'auth-login' && (
              <AuthView 
                onLogin={handleLogin}
                onNavigate={handleNavigate}
                onResetPassword={handleResetPassword}
              />
            )}
          </>
        )}
      </main>

      {/* Dynamic Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}