import { useMemo, useState, lazy, Suspense, useEffect } from "react";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { SnackbarProvider, closeSnackbar } from 'notistack';
import { Close } from "@mui/icons-material";
import { themeSettings } from "./theme";
import CircleLoading from "./components/global/circleloading";
import { useSelector } from "react-redux";
import { MyContextProvider } from "./components/global/MyContext";


import NewVisit from "./view/visit/newvisit";
import AllVisit from "./view/visit/allvisit";
import EditCustomer from "./view/visit/editcustomer";
import LevelView from "./view/associate/levelview";
import DateCalendarServerRequest from "./view/attendence/viewattendence";


import NewFollowUp from "./view/followup/newfollowup";
import AllFollowUp from "./view/followup/allfollowup";
import Payment from "./view/business/payment";

const Main = lazy(() => import('./view/main'));
const Home = lazy(() => import('./view/home'));
const Landing = lazy(() => import('./view/landing/Landing'));
const AddAssociate = lazy(() => import('./view/associate/addassociate'));
const ViewTeam = lazy(() => import('./view/associate/viewteam'));
const EditAssociate = lazy(() => import('./view/associate/editassociate'));
const AllBooking = lazy(() => import('./view/booking/bookinghistory'));
const AddCustomer = lazy(() => import('./view/visit/addcustomer'));
const VisitReport = lazy(() => import('./view/visit/visitreport'));



const Login = lazy(() => import('./view/login/login'));
const Loginotp = lazy(() => import('./view/login/loginotp'));
const PassVerify = lazy(() => import('./view/login/passverify'));
const Forgetotp = lazy(() => import('./view/login/forgetotp'));
const ForgetVerify = lazy(() => import('./view/login/forgetverify'));
const Reset = lazy(() => import('./view/login/reset'));

function App() {

  const [user, setUser] = useState({});
  const [role, setRole] = useState(null);
  const userId = useSelector((state) => state.global.userId);
  const theme = useMemo(() => createTheme(themeSettings()));
  const apiUrl = process.env.REACT_APP_API_URL;

  const auth = () => {
    axios.post(apiUrl + 'auth/auth')
      .then(function (response) {
        if (response.data.status) {
          setRole(response.data.data.role);
        }
        else {
          setRole(null);
        }
      })
      .catch(function (error) {
        setRole(null);
      });
  }

  useEffect(() => {
    //auth();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          style={{ marginTop: "50px", fontSize: { xs: "12px", md: "14px" } }}
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={4000}
          preventDuplicate={true}
          action={(snackbarId) => (
            <IconButton onClick={() => closeSnackbar(snackbarId)}>
              <Close fontSize="small" sx={{ color: "#fff" }} />
            </IconButton>
          )}
        >
          <MyContextProvider value={{ apiUrl, role, user, setUser }}>

            <BrowserRouter>
              <Routes>
                {userId.payload == null && <Route path="/*" element={<Navigate to="/" replace />} />}
                <Route exact path="/login" element={<Suspense fallback={<CircleLoading />}><Login setRole={setRole} /></Suspense>} />
                <Route exact path="/login-otp" element={<Suspense fallback={<CircleLoading />}><Loginotp /></Suspense>} />
                <Route exact path="/pass-verify" element={<Suspense fallback={<CircleLoading />}><PassVerify setRole={setRole} /></Suspense>} />
                <Route exact path="/forget" element={<Suspense fallback={<CircleLoading />}><Forgetotp /></Suspense>} />
                <Route exact path="/forget-verify" element={<Suspense fallback={<CircleLoading />}><ForgetVerify /></Suspense>} />
                <Route exact path="/reset" element={<Suspense fallback={<CircleLoading />}><Reset setRole={setRole} /></Suspense>} />

                <Route exact path="/" element={<Suspense fallback={<CircleLoading />}>{role !== null ? <Main setRole={setRole} /> : <Landing />}</Suspense>} >
                  <Route exact path="/" element={<Suspense fallback={<CircleLoading />}><Home /></Suspense>} />
                  {role !== null &&
                    <>
                      <Route exact path="add-associate" element={<Suspense fallback={<CircleLoading />}><AddAssociate /></Suspense>} />
                      <Route exact path="view-team" element={<Suspense fallback={<CircleLoading />}><ViewTeam /></Suspense>} />
                      <Route exact path="level-view" element={<Suspense fallback={<CircleLoading />}><LevelView /></Suspense>} />
                      <Route exact path="new-visit" element={<Suspense fallback={<CircleLoading />}><NewVisit /></Suspense>} />
                      <Route exact path="all-visit/:id" element={<Suspense fallback={<CircleLoading />}><AllVisit /></Suspense>} />
                      <Route exact path="new-follow-up" element={<Suspense fallback={<CircleLoading />}><NewFollowUp /></Suspense>} />
                      <Route exact path="all-follow-up" element={<Suspense fallback={<CircleLoading />}><AllFollowUp /></Suspense>} />
                      <Route exact path="add-customer" element={<Suspense fallback={<CircleLoading />}><AddCustomer /></Suspense>} />
                      <Route exact path="edit-customer/:id" element={<Suspense fallback={<CircleLoading />}><EditCustomer /></Suspense>} />
                      <Route exact path="visit-report" element={<Suspense fallback={<CircleLoading />}><VisitReport /></Suspense>} />
                      <Route exact path="booking-history" element={<Suspense fallback={<CircleLoading />}><AllBooking /></Suspense>} />
                      <Route exact path="business-payment" element={<Suspense fallback={<CircleLoading />}><Payment /></Suspense>} />
                      <Route exact path="view-attendence" element={<Suspense fallback={<CircleLoading />}><DateCalendarServerRequest /></Suspense>} />
                      <Route exact path="profile" element={<Suspense fallback={<CircleLoading />}><EditAssociate /></Suspense>} />
                    </>
                  }
                  <Route exact path="*" element={<h1>404</h1>} />

                </Route>
              </Routes>
            </BrowserRouter>
          </MyContextProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div >
  );
}

export default App;
