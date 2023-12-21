import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";
import AdminstrativStaffUI from "./pages/adminstrative-staff/adminstrativeStaffUI";
import AdminstrativeStaffEdit from "./pages/adminstrative-staff/adminstrativeStaffEdit";
import AdminstrativeStaffCreate from "./pages/adminstrative-staff/adminstrativeStaffCreate";
import AboutEdit from "./pages/about/aboutEdit";
import Publication from "./pages/publication/publication";
import PublicationEdit from "./pages/publication/publicationEdit";
import PublicationCreate from "./pages/publication/publicationCreate";
import Alumni from "./pages/alumni/alumni";
import AlumniEdit from "./pages/alumni/alumniEdit";
import AlumniCreate from "./pages/alumni/alumniCreate";
import AcademicStaffEdit from "./pages/academic-staff/academicStaffEdit";
import AcademicStaffUI from "./pages/academic-staff/academicStaffUI";
import AcademicStaffCreate from "./pages/academic-staff/academicStaffCreate";
import StudentClub from "./pages/student-club/studentClub";
import StudentClubEdit from "./pages/student-club/studentClubEdit";
import StudentClubCreate from "./pages/student-club/studentClubCreate";
import EventEdit from "./pages/event/eventEdit";
import EventUI from "./pages/event/eventUI";
import EventCreate from "./pages/event/eventCreate";
import NewsEdit from "./pages/news/newsEdit";
import NewsUI from "./pages/news/newsUI";
import NewsCreate from "./pages/news/newsCreate";
import AcademicProgramsCreate from "./pages/academic-programs/academicProgramsCreate";
import AcademicProgramsUI from "./pages/academic-programs/academicProgramsUI";
import AcademicProgramsEdit from "./pages/academic-programs/academicProgramsEdit";
import AcademicProgramsDetailsUI from "./pages/academic-programs/academicProgramsDetailsUI";
import CourseCreate from "./pages/course/courseCreate";
import CourseEdit from "./pages/course/courseEdit";
import CourseUI from "./pages/course/courseUI";

function App() {
  return (
    <section className="flex">
      <div className="min-w-[250px]">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/about/edit" element={<AboutEdit />} />

        <Route path="/adminstrative-staff" element={<AdminstrativStaffUI />} />
        <Route
          path="/adminstrative-staff/edit/:id"
          element={<AdminstrativeStaffEdit />}
        />
        <Route
          path="/adminstrative-staff/create/"
          element={<AdminstrativeStaffCreate />}
        />

        <Route path="/publication/edit/:id" element={<PublicationEdit />} />
        <Route path="/publication" element={<Publication />} />
        <Route path="/publication/create" element={<PublicationCreate />} />

        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/edit/:id" element={<AlumniEdit />} />
        <Route path="/alumni/create" element={<AlumniCreate />} />

        <Route
          path="/academic-staff/edit/:id"
          element={<AcademicStaffEdit />}
        />
        <Route path="/academic-staff" element={<AcademicStaffUI />} />
        <Route
          path="/academic-staff/create"
          element={<AcademicStaffCreate />}
        />

        <Route path="/student-club/edit/:id" element={<StudentClubEdit />} />
        <Route path="/student-club" element={<StudentClub />} />
        <Route path="/student-club/create" element={<StudentClubCreate />} />

        <Route path="/event/edit/:id" element={<EventEdit />} />
        <Route path="/event" element={<EventUI />} />
        <Route path="/event/create" element={<EventCreate />} />

        <Route path="/news/edit/:id" element={<NewsEdit />} />
        <Route path="/news" element={<NewsUI />} />
        <Route path="/news/create" element={<NewsCreate />} />

        <Route
          path="/academic-programs/edit/:id"
          element={<AcademicProgramsEdit />}
        />
        <Route path="/academic-programs" element={<AcademicProgramsUI />} />
        <Route
          path="/academic-programs/create"
          element={<AcademicProgramsCreate />}
        />
        <Route
          path="/academic-programs/details/:id"
          element={<AcademicProgramsDetailsUI />}
        />

        <Route path="/course/edit/:id" element={<CourseEdit />} />
        <Route path="/course/create" element={<CourseCreate />} />
        <Route path="/course" element={<CourseUI />} />
      </Routes>
    </section>
  );
}

export default App;
