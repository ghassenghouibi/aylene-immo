type P = { size?: number; filled?: boolean }
const S = ({ size = 18, children, fill = 'none' }: { size?: number; children: React.ReactNode; fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
)
export const ArrowRight = ({ size }: P) => <S size={size}><path d="M5 12h14M13 6l6 6-6 6" /></S>
export const ArrowLeft = ({ size }: P) => <S size={size}><path d="M19 12H5M11 6l-6 6 6 6" /></S>
export const Chevron = ({ size }: P) => <S size={size}><path d="M6 9l6 6 6-6" /></S>
export const ChevronLeft = ({ size }: P) => <S size={size}><path d="M15 6l-6 6 6 6" /></S>
export const ChevronRight = ({ size }: P) => <S size={size}><path d="M9 6l6 6-6 6" /></S>
export const X = ({ size }: P) => <S size={size}><path d="M6 6l12 12M18 6L6 18" /></S>
export const Menu = ({ size }: P) => <S size={size}><path d="M4 7h16M4 12h16M4 17h16" /></S>
export const Search = ({ size }: P) => <S size={size}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></S>
export const Pin = ({ size }: P) => <S size={size}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></S>
export const Heart = ({ size, filled }: P) => <S size={size} fill={filled ? 'currentColor' : 'none'}><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z" /></S>
export const Bed = ({ size }: P) => <S size={size}><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M6 9V6h5v3M13 9V6h5v3" /></S>
export const Bath = ({ size }: P) => <S size={size}><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM6 12V5a2 2 0 0 1 4 0" /></S>
export const Area = ({ size }: P) => <S size={size}><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M4 9h5V4M20 15h-5v5" /></S>
export const Land = ({ size }: P) => <S size={size}><path d="M3 18l6-8 4 5 3-3 5 6H3z" /><circle cx="17" cy="7" r="2" /></S>
export const Camera = ({ size }: P) => <S size={size}><path d="M4 8h3l2-2h6l2 2h3v11H4z" /><circle cx="12" cy="13" r="3.2" /></S>
export const Check = ({ size }: P) => <S size={size}><path d="M5 12.5l4.5 4.5L19 7.5" /></S>
export const CheckCircle = ({ size }: P) => <S size={size}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16.5 9.5" /></S>
export const Clock = ({ size }: P) => <S size={size}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>
export const Shield = ({ size }: P) => <S size={size}><path d="M12 3l7 3v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-3z" /><path d="M9 12l2 2 4-4" /></S>
export const Scale = ({ size }: P) => <S size={size}><path d="M12 4v16M4 20h16M12 6l-6 2 6-2 6 2M4 13a3 3 0 0 0 6 0L7 8zM14 13a3 3 0 0 0 6 0l-3-5z" /></S>
export const User = ({ size }: P) => <S size={size}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></S>
export const Users = ({ size }: P) => <S size={size}><circle cx="9" cy="8" r="3.5" /><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 20a6.5 6.5 0 0 0-4.5-6.2" /></S>
export const Phone = ({ size }: P) => <S size={size}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></S>
export const Mail = ({ size }: P) => <S size={size}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></S>
export const WhatsApp = ({ size }: P) => <S size={size}><path d="M4 20l1.3-3.8A8 8 0 1 1 8 19.2L4 20z" /><path d="M9.5 9.5c0 3 2 5 5 5l1-1.5-1.8-.8-.8.8a3.5 3.5 0 0 1-1.8-1.8l.8-.8-.8-1.8L9.5 9.5z" /></S>
export const Calendar = ({ size }: P) => <S size={size}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></S>
export const FileText = ({ size }: P) => <S size={size}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></S>
export const Key = ({ size }: P) => <S size={size}><circle cx="8" cy="14" r="4" /><path d="M11 11l9-9M16 6l2 2M13 9l2 2" /></S>
export const Compass = ({ size }: P) => <S size={size}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></S>
export const Trend = ({ size }: P) => <S size={size}><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></S>
export const Calculator = ({ size }: P) => <S size={size}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h2M8 16h2M12 12h2M12 16h2M16 12h0M16 16h0" /></S>
export const Sparkle = ({ size }: P) => <S size={size}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></S>
export const Share = ({ size }: P) => <S size={size}><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" /></S>
export const Map = ({ size }: P) => <S size={size}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></S>
export const Grid = ({ size }: P) => <S size={size}><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></S>
export const Filter = ({ size }: P) => <S size={size}><path d="M4 6h16M7 12h10M10 18h4" /></S>
export const Home = ({ size }: P) => <S size={size}><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" /></S>
export const Eye = ({ size }: P) => <S size={size}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></S>
export const Quote = ({ size }: P) => <S size={size} fill="currentColor"><path d="M6 11h4v7H4v-5a5 5 0 0 1 5-5v2a3 3 0 0 0-3 1zM15 11h4v7h-6v-5a5 5 0 0 1 5-5v2a3 3 0 0 0-3 1z" stroke="none" /></S>
export const Instagram = ({ size }: P) => <S size={size}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" /></S>
export const Linkedin = ({ size }: P) => <S size={size}><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10v7M8 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></S>
export const Facebook = ({ size }: P) => <S size={size}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></S>
// ---- À proximité ----
export const Bag = ({ size }: P) => <S size={size}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></S>
export const Cap = ({ size }: P) => <S size={size}><path d="M2 9l10-4 10 4-10 4L2 9z" /><path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4M20 10v5" /></S>
export const Bus = ({ size }: P) => <S size={size}><rect x="4" y="4" width="16" height="12" rx="2" /><path d="M4 10h16M7 20v-2M17 20v-2" /><circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="16" cy="16" r="1" fill="currentColor" /></S>
export const Cross = ({ size }: P) => <S size={size}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></S>
export const Tree = ({ size }: P) => <S size={size}><path d="M12 3l5 7h-3l4 6H6l4-6H7l5-7zM12 16v5" /></S>
export const Bank = ({ size }: P) => <S size={size}><path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" /></S>
