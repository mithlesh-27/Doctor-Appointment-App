# 🩺 Doctor-Appointment Booking App
A modern, responsive web app to book, view, and manage doctor appointments using a calendar interface.

## 🚀 Features

- 📆 Monthly calendar view with light/dark mode
- 🌓 Dark / Light theme toggle
- 🔔 Notifications on successful booking or update
- 📝 Add/edit/delete appointments with detailed patient info
- 🖥 Clean, premium responsive UI with Tailwind
- ☁️ Easy deployment to Vercel or Netlify

## 🛠 Tech Stack

- **Framework:** Next.js + TypeScript
- **UI Styling:** Tailwind CSS
- **State Management:** React Context API
- **Enhancements:** react-hot-toast, lucide-react (icons)

## 📁 Project Structure

```
apointment-booking/
├── components/
│   ├── AppointmentCard.tsx      # Optional reusable appointment tile
│   ├── BookingModal.tsx         # Modal to book/edit appointments
│   ├── Calendar.tsx             # Calendar component
│   └── Sidebar.tsx              # Right sidebar with patient details
├── context/
│   └── AppointmentContext.tsx   # App-wide context provider
├── pages/
│   └── index.tsx                # Main entry with Calendar + Sidebar
├── styles/
│   └── globals.css              # Tailwind + custom styles
├── types/
│   └── index.ts                 # Appointment & category types
├── public/                      # Assets (favicon, images)
├── tailwind.config.js
├── tsconfig.json
├── package.json
```

## 🧪 Running Locally

### 📥 Download or Clone the Project
```bash
git clone https://github.com/mithlesh-27/Doctor-Appointment-App.git
cd Doctor-Appointment-App

### 📦 Install Dependencies
npm install next react react-dom
npm install typescript @types/react @types/node --save-dev
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install dayjs react-hot-toast lucide-react
```

### ▶️ Start the development server
```bash
npm run dev
```
Visit: `http://localhost:3000`

## 🌍 Deployment

🔗 Doctor Appointmnet app will be live at vercel:
```
https://doctor-appointment-app-lyart.vercel.app/
```

## 🙌 Author
Built with ❤️ by [Mithlesh]

Open to contributions & enhancements! 🚀
