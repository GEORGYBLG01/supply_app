import "./App.css";
import React, { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CaseDetails from "./components/CaseDetails";
import { AuthProvider } from "./context/AuthContext";
import { EnterpriseProvider} from "./context/EnterpriseContext";
import { useAuth } from "./context/AuthContext";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Connexion from "./components/Connexion";
import InformationalModel from "./components/InformationalModel";
import Home from "./components/Home";
import FunctionalView1 from "./components/FunctionalView1";
import Acquisition from "./components/Acquisition";
import PhysicalModel1 from "./components/PhysicalModel1";
import ExistingCase from "./components/ExistingCase";
import DecisionalModel1 from "./components/DecisionalModel1";
import ProcessView1 from "./components/ProcessView1";
import InformationalModel1 from "./components/InformationalModel1";
import Environmental1 from "./components/Environmental1";
import MeasuringForm from "./components/MeasuringForm";
import LeanVSM1 from "./components/LeanVSM1";
import X5S1 from "./components/X5S1";
import Analysis from "./components/Analysis";
import VisualManagement1 from "./components/VisualManagement1";
import FunctionalView from "./components/FunctionalView";
import Objectives from "./components/Objectives";
import PhysicalModel from "./components/PhysicalModel";
import DecisionalModel from "./components/DecisionalModel";
import ProcessView from "./components/ProcessView";
import SMED2 from "./components/SMED2";
import SMED3 from "./components/SMED3";
import VisualManagement2 from "./components/VisualManagement2";
import Kaizen3 from "./components/Kaizen3";
import VisualManagement3 from "./components/VisualManagement3";
import Inscription from "./components/Inscription";
import ClientConsommateur2 from "./components/ClientConsommateur2";
import Social1 from "./components/Social1";
import Modernization1 from "./components/Modernization1";
import ClientConsommateur1 from "./components/ClientConsommateur1";
import LeadTime1 from "./components/LeadTime1";
import Cost1 from "./components/Cost1";
import Quality1 from "./components/Quality1";
import Environmental2 from "./components/Environmental2";
import Environmental3 from "./components/Environmental3";
import Social2 from "./components/Social2";
import Modernization2 from "./components/Modernization2";
import Cost2 from "./components/Cost2";
import LeadTime2 from "./components/Leadtime2";
import Quality6 from "./components/Quality6";
import InformationalModel3 from "./components/InformationalModel3";
import InformationalModel2 from "./components/InformationalModel2";
import ProcessView2 from "./components/ProcessView2";
import Quality2 from "./components/Quality2";
import ProcessView3 from "./components/ProcessView3";
import DecisionalView2 from "./components/DecisionalView2";
import PhysicalModel2 from "./components/PhysicalModel2";
import DecisionalView3 from "./components/DecisionalView3";
import Quality5 from "./components/Quality5";
import PhysicalModel3 from "./components/PhysicalModel3";
import FunctionnalView2 from "./components/FunctionnalView2";
import FunctionnalView3 from "./components/FunctionnalView3";
import FunctionnalView4 from "./components/FunctionnalView4";
import LoadingPage from "./components/LoadingPage";
import Kaizen1 from "./components/Kaizen1";
import ExistingSystems from "./components/ExistingSystems";
import Kanban1 from "./components/Kanban1";
import LeanVSM from "./components/LeanVSM";
import SMED1 from "./components/SMED1";
import X5S from "./components/X5S";
import Kaizen12 from "./components/Kaizen12";
import Quality4 from "./components/Quality4";
import Kaizen from "./components/Kaizen";
import SMED from "./components/SMED";
import VisualManagement from "./components/VisualManagement";
import Kanban from "./components/Kanban";
import Kaizen2 from "./components/Kaizen2";
import Kanban3 from "./components/Kanban3";
import MesureDePerformancesFutures from "./components/MesureDePerformancesFutures";
import X5s2 from "./components/X5s2";
import Kanban2 from "./components/Kanban2";
import X5s3 from "./components/X5s3";
import LeanVSM3 from "./components/LeanVSM3";
import LeanVSM2 from "./components/LeanVSM2";
import Kaizen11 from "./components/Kaizen11";
import Quality3 from "./components/Quality3";
import LeanVSM4 from "./components/LeanVSM4";
import MesureDePerformancesFutures1 from "./components/MesureDePerformancesFutures1";
import ExistingSystems2 from "./components/ExistingSystems2";
import Environmental5 from "./components/Environmental5";
import Social3 from "./components/Social3";
import Environmental4 from "./components/Environmental4";
import Modernization3 from "./components/Modernization3";
import Social4 from "./components/Social4";
import Social6 from "./components/Social6";
import Social5 from "./components/Social5";
import Modernization4 from "./components/Modernization4";
import ClientConsommateur3 from "./components/ClientConsommateur3";
import References from "./components/References";
import CurPerformance from "./components/CurPerformance";
import LeadTime from "./components/LeadTime";
import Cost from "./components/Cost";
import Modernization from "./components/Modernization";
import Login from "./components/Login/Login";
import BeautifulPage from "./components/Analysis1/Analysis";


const AdminRoute = ({ children, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  console.log("AdminRoute - État d'authentification:", isAuthenticated, "Est admin:", isAdmin);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated && isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: isAuthenticated ? "/home" : "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
// Composant PrivateRoute pour protéger les routes
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth();
  
  console.log("PrivateRoute - État d'authentification:", isAuthenticated);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);

     // À ajouter dans la fonction App(), après la déclaration de l'état loading
const [performanceData, setPerformanceData] = useState({
  currentResults: {},
  enterpriseData: {}
});

  const handleLoadingComplete = () => {
    setLoading(false);
  };
     // À ajouter dans la fonction App(), après les autres useEffect
  useEffect(() => {
      // Récupérer l'ID de l'entreprise depuis le localStorage
    const enterpriseId = localStorage.getItem('enterpriseId');
      
      // Fonctions pour récupérer les données si l'ID existe
    if (enterpriseId) {
      const fetchData = async () => {
        try {
            // 1. Récupérer les scores
          const apiUrl = `${window.env.API_URL || ''}/api/enterprise-scores/${enterpriseId}`;
          const response = await fetch(apiUrl, {
            headers: {
              "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
            }
          });
            
            if (response.ok) {
              const data = await response.json();
              console.log("Scores récupérés avec succès:", data);
              
              // 2. Récupérer les informations de l'entreprise
              const enterpriseUrl = `${window.env.API_URL || ''}/api/enterprise/${enterpriseId}`;
              const enterpriseResponse = await fetch(enterpriseUrl, {
                headers: {
                  "Authorization": localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
                }
              });
              
              if (enterpriseResponse.ok) {
                const enterpriseData = await enterpriseResponse.json();
                console.log("Données entreprise récupérées:", enterpriseData);
                
                // 3. Mettre à jour l'état avec les données
                setPerformanceData({
                  currentResults: data,
                  enterpriseData: enterpriseData
                });
              }
            }
          } catch (err) {
            console.error("Erreur lors de la récupération des données de performance:", err);
          }
        };
        
        fetchData();
      }
    }, []);

  return (
    <AuthProvider>
     <EnterpriseProvider>
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!loading && <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/analysis1">
          <BeautifulPage />
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <PrivateRoute path="/connexion">
          <Redirect to="/" />
        </PrivateRoute>
        <PrivateRoute path="/informational-model">
          <InformationalModel {...informationalModelData} />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <Home {...homeData} />
        </PrivateRoute>
        <PrivateRoute path="/functional-view-1">
          <FunctionalView1 {...functionalView1Data} />
        </PrivateRoute>
        <PrivateRoute path="/acquisition">
          <Acquisition {...acquisitionData} />
        </PrivateRoute>
        <PrivateRoute path="/physical-model-1">
          <PhysicalModel1 {...physicalModel1Data} />
        </PrivateRoute>
        <PrivateRoute path="/existing-case">
          <ExistingCase
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            existingCase="Existing Case"
            frame11622Props={existingCaseData.frame11622Props}
          />
        </PrivateRoute>
        <PrivateRoute path="/decisional-model-1">
          <DecisionalModel1 {...decisionalModel1Data} />
        </PrivateRoute>
        <PrivateRoute path="/process-view-1">
          <ProcessView1 {...processView1Data} />
        </PrivateRoute>
        <PrivateRoute path="/informational-model-1">
          <InformationalModel1 {...informationalModel1Data} />
        </PrivateRoute>
        <PrivateRoute path="/environmental-1">
          <Environmental1 {...environmental1Data} />
        </PrivateRoute>
        <PrivateRoute path="/measuring-form">
          <MeasuringForm {...measuringFormData} />
        </PrivateRoute>
        <PrivateRoute path="/lean-vsm-1">
          <LeanVSM1 {...leanVSM1Data} />
        </PrivateRoute>
        <PrivateRoute path="/5s-1">
          <X5S1 {...x5S1Data} />
        </PrivateRoute>
        <PrivateRoute path="/analysis">
          <Analysis {...analysisData} />
        </PrivateRoute>
        <PrivateRoute path="/visual-management-1">
          <VisualManagement1 {...visualManagement1Data} />
        </PrivateRoute>
        <PrivateRoute path="/functional-view">
          <FunctionalView {...functionalViewData} />
        </PrivateRoute>
        <PrivateRoute path="/objectives">
          <Objectives {...objectivesData} />
        </PrivateRoute>
        <PrivateRoute path="/physical-model">
          <PhysicalModel {...physicalModelData} />
        </PrivateRoute>
        <PrivateRoute path="/decisional-model">
          <DecisionalModel {...decisionalModelData} />
        </PrivateRoute>
        <PrivateRoute path="/process-view">
          <ProcessView {...processViewData} />
        </PrivateRoute>
        <PrivateRoute path="/smed-2">
          <SMED2 {...sMED2Data} />
        </PrivateRoute>
        <PrivateRoute path="/smed-3">
          <SMED3 {...sMED3Data} />
        </PrivateRoute>
        <PrivateRoute path="/visual-management-2">
          <VisualManagement2 {...visualManagement2Data} />
        </PrivateRoute>
        <PrivateRoute path="/kaizen-3">
          <Kaizen3 {...kaizen3Data} />
        </PrivateRoute>
        <PrivateRoute path="/visual-management-3">
          <VisualManagement3
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            pleaseAnswerTheFollowingQuestions="PLEASE ANSWER THE FOLLOWING QUESTIONS"
            goOnToTheNextStep="Go on to the next Step"
            navItems2Props={visualManagement3Data.navItems2Props}
            navItems3Props={visualManagement3Data.navItems3Props}
            toggleProps={visualManagement3Data.toggleProps}
          />
        </PrivateRoute>
        {/*<PrivateRoute path="/cur-performances">
          <CurPerformances {...curPerformancesData} />
        </PrivateRoute>*/}
        <Route path="/inscription">
          <Inscription {...inscriptionData} />
        </Route>
        <PrivateRoute path="/client-consommateur-2">
          <ClientConsommateur2 {...clientConsommateur2Data} />
        </PrivateRoute>
        <PrivateRoute path="/social-1">
          <Social1 {...social1Data} />
        </PrivateRoute>
        <PrivateRoute path="/modernization-1">
          <Modernization1 {...modernization1Data} />
        </PrivateRoute>
        <PrivateRoute path="/client-consommateur-1">
          <ClientConsommateur1 {...clientConsommateur1Data} />
        </PrivateRoute>
        <PrivateRoute path="/lead-time-1">
          <LeadTime1 {...leadTime1Data} />
        </PrivateRoute>
        <PrivateRoute path="/cost-1">
          <Cost1 {...cost1Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-1">
          <Quality1 {...quality1Data} />
        </PrivateRoute>
        <PrivateRoute path="/environmental-2">
          <Environmental2 {...environmental2Data} />
        </PrivateRoute>
        <PrivateRoute path="/environmental-3">
          <Environmental3 {...environmental3Data} />
        </PrivateRoute>
        <PrivateRoute path="/social-2">
          <Social2 {...social2Data} />
        </PrivateRoute>
        <PrivateRoute path="/modernization-2">
          <Modernization2 {...modernization2Data} />
        </PrivateRoute>
        <PrivateRoute path="/cost-2">
          <Cost2 {...cost2Data} />
        </PrivateRoute>
        <PrivateRoute path="/lead-time-2">
          <LeadTime2 {...leadTime2Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-6">
          <Quality6 {...quality6Data} />
        </PrivateRoute>
        <PrivateRoute path="/informational-model-3">
          <InformationalModel3
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            pleaseAnswerTheFollowingQuestions="PLEASE ANSWER THE FOLLOWING QUESTIONS"
            navItems2Props={informationalModel3Data.navItems2Props}
            navItems3Props={informationalModel3Data.navItems3Props}
            toggleProps={informationalModel3Data.toggleProps}
          />
        </PrivateRoute>
        <PrivateRoute path="/informational-model-2">
          <InformationalModel2 {...informationalModel2Data} />
        </PrivateRoute>
        <PrivateRoute path="/process-view-2">
          <ProcessView2 {...processView2Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-2">
          <Quality2 {...quality2Data} />
        </PrivateRoute>
        <PrivateRoute path="/process-view-3">
          <ProcessView3
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            pleaseAnswerTheFollowingQuestions="PLEASE ANSWER THE FOLLOWING QUESTIONS"
            informationalModel="Informational Model"
            navItems2Props={processView3Data.navItems2Props}
            navItems3Props={processView3Data.navItems3Props}
            toggleProps={processView3Data.toggleProps}
          />
        </PrivateRoute>
        <PrivateRoute path="/decisional-view-2">
          <DecisionalView2 {...decisionalView2Data} />
        </PrivateRoute>
        <PrivateRoute path="/physical-model-2">
          <PhysicalModel2 {...physicalModel2Data} />
        </PrivateRoute>
        <PrivateRoute path="/decisional-view-3">
          <DecisionalView3 {...decisionalView3Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-5">
          <Quality5 {...quality5Data} />
        </PrivateRoute>
        <PrivateRoute path="/physical-model-3">
          <PhysicalModel3 {...physicalModel3Data} />
        </PrivateRoute>
        <PrivateRoute path="/functionnal-view-2">
          <FunctionnalView2
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            pleaseAnswerTheFollowingQuestions="PLEASE ANSWER THE FOLLOWING QUESTIONS"
            navItems2Props={functionnalView2Data.navItems2Props}
            navItems3Props={functionnalView2Data.navItems3Props}
            frame922Props={functionnalView2Data.frame922Props}
            frame93Props={functionnalView2Data.frame93Props}
            toggleProps={functionnalView2Data.toggleProps}
          />
        </PrivateRoute>
        <PrivateRoute path="/functionnal-view-3">
          <FunctionnalView3 {...functionnalView3Data} />
        </PrivateRoute>
        <PrivateRoute path="/functionnal-view-4">
          <FunctionnalView4 {...functionnalView4Data} />
        </PrivateRoute>
        <PrivateRoute path="/loading-page">
          <LoadingPage
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            inViewOfTheAnswe="IN VIEW OF THE ANSWERS TO THE PREVIOUS QUESTIONNAIRES, WE PROPOSE TO MAKE THE FOLLOWING MODELS"
            navItems3Props={loadingPageData.navItems3Props}
            frame112Props={loadingPageData.frame112Props}
          />
        </PrivateRoute>
        <PrivateRoute path="/kaizen-1">
          <Kaizen1 {...kaizen1Data} />
        </PrivateRoute>
        <PrivateRoute path="/existing-systems-2">
          <ExistingSystems {...existingSystemsData} />
        </PrivateRoute>
        <PrivateRoute path="/kanban-1">
          <Kanban1 {...kanban1Data} />
        </PrivateRoute>
        <PrivateRoute path="/lean-vsm">
          <LeanVSM {...leanVSMData} />
        </PrivateRoute>
        <PrivateRoute path="/smed-1">
          <SMED1 {...sMED1Data} />
        </PrivateRoute>
        <PrivateRoute path="/5s">
          <X5S {...x5SData} />
        </PrivateRoute>
        <PrivateRoute path="/kaizen1">
          <Kaizen12 {...kaizen12Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-4">
          <Quality4 {...quality4Data} />
        </PrivateRoute>
        <PrivateRoute path="/kaizen">
          <Kaizen {...kaizenData} />
        </PrivateRoute>
        <PrivateRoute path="/smed">
          <SMED {...sMEDData} />
        </PrivateRoute>
        <PrivateRoute path="/visual-management">
          <VisualManagement {...visualManagementData} />
        </PrivateRoute>
        <PrivateRoute path="/kanban">
          <Kanban {...kanbanData} />
        </PrivateRoute>
        <PrivateRoute path="/kaizen-2">
          <Kaizen2 {...kaizen2Data} />
        </PrivateRoute>
        <PrivateRoute path="/kanban-3">
          <Kanban3
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            pleaseAnswerTheFollowingQuestions="PLEASE ANSWER THE FOLLOWING QUESTIONS"
            kaizen="Kaizen"
            navItems3Props={kanban3Data.navItems3Props}
            frame101Props={kanban3Data.frame101Props}
            frame102Props={kanban3Data.frame102Props}
            toggleProps={kanban3Data.toggleProps}
          />
        </PrivateRoute>
        <PrivateRoute path="/mesure-de-performances-futures">
          <MesureDePerformancesFutures {...mesureDePerformancesFuturesData} />
        </PrivateRoute>
        <PrivateRoute path="/5s-2">
          <X5s2 {...x5s2Data} />
        </PrivateRoute>
        <PrivateRoute path="/kanban-2">
          <Kanban2 {...kanban2Data} />
        </PrivateRoute>
        <PrivateRoute path="/5s-3">
          <X5s3 {...x5s3Data} />
        </PrivateRoute>
        <PrivateRoute path="/lean-vsm-3">
          <LeanVSM3 {...leanVSM3Data} />
        </PrivateRoute>
        <PrivateRoute path="/lean-vsm-2">
          <LeanVSM2 {...leanVSM2Data} />
        </PrivateRoute>
        <PrivateRoute path="/kaizen1-1">
          <Kaizen11 {...kaizen11Data} />
        </PrivateRoute>
        <PrivateRoute path="/quality-3">
          <Quality3 {...quality3Data} />
        </PrivateRoute>
        <PrivateRoute path="/lean-vsm-4">
          <LeanVSM4 {...leanVSM4Data} />
        </PrivateRoute>
        <PrivateRoute path="/mesure-de-performances-futures-1">
          <MesureDePerformancesFutures1 {...mesureDePerformancesFutures1Data} />
        </PrivateRoute>
        <PrivateRoute path="/existing-systems">
          <ExistingSystems2 {...existingSystems2Data} />
        </PrivateRoute>
        <PrivateRoute path="/environmental-5">
          <Environmental5 {...environmental5Data} />
        </PrivateRoute>
        <PrivateRoute path="/case-details/:id">
          <CaseDetails />
        </PrivateRoute>
        <PrivateRoute path="/social-3">
          <Social3 {...social3Data} />
        </PrivateRoute>
        <PrivateRoute path="/environmental-4">
          <Environmental4 {...environmental4Data} />
        </PrivateRoute>
        <PrivateRoute path="/modernization-3">
          <Modernization3 {...modernization3Data} />
        </PrivateRoute>
        <PrivateRoute path="/social-4">
          <Social4 {...social4Data} />
        </PrivateRoute>
        <PrivateRoute path="/social-6">
          <Social6 {...social6Data} />
        </PrivateRoute>
        <PrivateRoute path="/social-5">
          <Social5 {...social5Data} />
        </PrivateRoute>
        <PrivateRoute path="/modernization-4">
          <Modernization4 {...modernization4Data} />
        </PrivateRoute>
        <PrivateRoute path="/client-consommateur-3">
          <ClientConsommateur3 {...clientConsommateur3Data} />
        </PrivateRoute>
        <PrivateRoute path="/references">
          <References {...referencesData} />
        </PrivateRoute>
        <PrivateRoute path="/cur-performance">
          <CurPerformance
            x1200PxLogo_Icam__20081="/img/1200px-logo-icam---2008-1@2x.png"
            resultPropositions="Result & Propositions"
            place="Back"
            formalismesEnFonct="FORMALISMES  EN FONCTION DES PROBLÈMES TROUVÉS"
            navItems3Props={curPerformanceData.navItems3Props}
            frame11332Props={curPerformanceData.frame11332Props}
            currentResults={performanceData.currentResults}
            enterpriseData={performanceData.enterpriseData}
          />
        </PrivateRoute>
        <PrivateRoute path="/lead-time">
          <LeadTime {...leadTimeData} />
        </PrivateRoute>
        <PrivateRoute path="/cost">
          <Cost {...costData} />
        </PrivateRoute>
        <PrivateRoute path="/modernization">
          <Modernization {...modernizationData} />
        </PrivateRoute>
      </Switch>
    </Router>}
    </>
    </EnterpriseProvider>
    </AuthProvider>
  );
}

export default App;
const connexionData = {
  polygon3: "/img/polygon-3@2x.png",
  aerialViewContainerCargoShipSea1:
    "/img/aerial-view-container-cargo-ship-sea-1.png",
  subtract: "/img/subtract.png",
  polygon1: "/img/polygon-1@2x.png",
  polygon2: "/img/polygon-2@2x.png",
  login1: "login",
  login2: "If you din’t have an account",
  frame126: "/img/1200px-logo-icam---20081@2x.png",
};

const frame116221Data = {
  children: "Decisional Model",
};

const frame117221Data = {
  children: "Process view",
};

const frame11361Data = {
  children: "Informational model",
};

const navItems452Data = {
  frame1162Props: frame116221Data,
  frame1172Props: frame117221Data,
  frame1136Props: frame11361Data,
};

const tableHeader1Data = {
  children: "",
};

const tableHeader2Data = {
  children: "Company",
  className: "table-header-4",
};

const tableNumberBase41Data = {
  bottomLine: "/img/bottom-line-3@2x.png",
  leftLine: "/img/left-line-3@2x.png",
  rightLine: "/img/right-line-3@2x.png",
  className: "",
};

const tableNumberPrimaryKey21Data = {
  tableNumberBase4Props: tableNumberBase41Data,
};

const key3Data = {
  className: "key-2",
};

const tableNumberBase51Data = {
  type: "property1:string",
  bottomLine: "/img/bottom-line-4@2x.png",
  leftLine: "/img/left-line-4@2x.png",
  rightLine: "/img/right-line-4@2x.png",
  className: "",
  keyProps: key3Data,
};

const tableTextBase21Data = {
  tableNumberBase5Props: tableNumberBase51Data,
};

const key4Data = {
  className: "key-3",
};

const tableNumberBase61Data = {
  bottomLine: "/img/bottom-line-5@2x.png",
  leftLine: "/img/left-line-5@2x.png",
  rightLine: "/img/right-line-5@2x.png",
  className: "",
  keyProps: key4Data,
};

const tableNumberBaseNull21Data = {
  tableNumberBase6Props: tableNumberBase61Data,
};

const tableTextBaseNull21Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull21Data,
};

const crewMember1Data = {
  tableHeaderProps: tableHeader2Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey21Data,
  tableTextBase2Props: tableTextBase21Data,
  tableTextBaseNull2Props: tableTextBaseNull21Data,
};

const tableHeader3Data = {
  children: "Insurances",
  className: "table-header-5",
};

const tableNumberBase42Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "",
};

const tableNumberPrimaryKey22Data = {
  tableNumberBase4Props: tableNumberBase42Data,
};

const key5Data = {
  className: "key-4",
};

const tableNumberBase71Data = {
  keyProps: key5Data,
};

const tableTextBase31Data = {
  tableNumberBase7Props: tableNumberBase71Data,
};

const key6Data = {
  className: "key-5",
};

const tableNumberBase62Data = {
  bottomLine: "/img/bottom-line-2@2x.png",
  leftLine: "/img/left-line-2@2x.png",
  rightLine: "/img/right-line-2@2x.png",
  className: "",
  keyProps: key6Data,
};

const tableNumberBaseNull22Data = {
  tableNumberBase6Props: tableNumberBase62Data,
};

const tableTextBaseNull22Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull22Data,
};

const crewMember21Data = {
  tableHeaderProps: tableHeader3Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey22Data,
  tableTextBase3Props: tableTextBase31Data,
  tableTextBaseNull2Props: tableTextBaseNull22Data,
};

const tableHeader4Data = {
  children: "Cars",
  className: "table-header-6",
};

const tableNumberBase43Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "",
};

const tableNumberPrimaryKey23Data = {
  tableNumberBase4Props: tableNumberBase43Data,
};

const key7Data = {
  className: "key-6",
};

const tableNumberBase52Data = {
  type: "registrationplate:string",
  bottomLine: "/img/bottom-line-10@2x.png",
  leftLine: "/img/left-line-10@2x.png",
  rightLine: "/img/right-line-10@2x.png",
  className: "table-number-base-10",
  keyProps: key7Data,
};

const tableTextBase22Data = {
  className: "table-text-base-4",
  tableNumberBase5Props: tableNumberBase52Data,
};

const key8Data = {
  className: "key-7",
};

const tableNumberBase81Data = {
  keyProps: key8Data,
};

const tableNumberBaseNull31Data = {
  tableNumberBase8Props: tableNumberBase81Data,
};

const tableTextBaseNull31Data = {
  tableNumberBaseNull3Props: tableNumberBaseNull31Data,
};

const crewMember31Data = {
  tableHeaderProps: tableHeader4Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey23Data,
  tableTextBase2Props: tableTextBase22Data,
  tableTextBaseNull3Props: tableTextBaseNull31Data,
};

const tableHeader5Data = {
  children: "Employees",
  className: "table-header-7",
};

const tableNumberBase44Data = {
  bottomLine: "/img/bottom-line-12@2x.png",
  leftLine: "/img/left-line-12@2x.png",
  rightLine: "/img/right-line-12@2x.png",
  className: "",
};

const tableNumberPrimaryKey24Data = {
  tableNumberBase4Props: tableNumberBase44Data,
};

const key9Data = {
  className: "key-8",
};

const tableNumberBase53Data = {
  type: "name:string",
  bottomLine: "/img/bottom-line-13@2x.png",
  leftLine: "/img/left-line-13@2x.png",
  rightLine: "/img/right-line-13@2x.png",
  className: "table-number-base-8-2",
  keyProps: key9Data,
};

const tableTextBase23Data = {
  tableNumberBase5Props: tableNumberBase53Data,
};

const key10Data = {
  className: "key-9",
};

const tableNumberBase63Data = {
  bottomLine: "/img/bottom-line-14@2x.png",
  leftLine: "/img/left-line-14@2x.png",
  rightLine: "/img/right-line-14@2x.png",
  className: "",
  keyProps: key10Data,
};

const tableNumberBaseNull23Data = {
  tableNumberBase6Props: tableNumberBase63Data,
};

const tableTextBaseNull23Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull23Data,
};

const crewMember41Data = {
  tableHeaderProps: tableHeader5Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey24Data,
  tableTextBase2Props: tableTextBase23Data,
  tableTextBaseNull2Props: tableTextBaseNull23Data,
};

const tableHeader6Data = {
  children: "Bonus",
  className: "table-header",
};

const tableNumberBase45Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "",
};

const tableNumberPrimaryKey25Data = {
  tableNumberBase4Props: tableNumberBase45Data,
};

const key11Data = {
  className: "key-10",
};

const tableNumberBase54Data = {
  type: "amount:int32",
  bottomLine: "/img/bottom-line-1@2x.png",
  leftLine: "/img/left-line-1@2x.png",
  rightLine: "/img/right-line-1@2x.png",
  className: "table-number-base-8",
  keyProps: key11Data,
};

const tableTextBase24Data = {
  className: "table-text-base-5",
  tableNumberBase5Props: tableNumberBase54Data,
};

const key12Data = {
  className: "key-11",
};

const tableNumberBase64Data = {
  bottomLine: "/img/bottom-line-2@2x.png",
  leftLine: "/img/left-line-2@2x.png",
  rightLine: "/img/right-line-2@2x.png",
  className: "",
  keyProps: key12Data,
};

const tableNumberBaseNull24Data = {
  tableNumberBase6Props: tableNumberBase64Data,
};

const tableTextBaseNull24Data = {
  className: "table-text-base-null-4",
  tableNumberBaseNull2Props: tableNumberBaseNull24Data,
};

const crewMember51Data = {
  tableHeaderProps: tableHeader6Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey25Data,
  tableTextBase2Props: tableTextBase24Data,
  tableTextBaseNull2Props: tableTextBaseNull24Data,
};

const informationalModelData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  arrow7: "/img/arrow-1-2@2x.png",
  arrow8: "/img/arrow-2-2@2x.png",
  line31: "/img/line-3@2x.png",
  line4: "/img/line-4@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  arrow1: "/img/arrow-1-12@2x.png",
  arrow2: "/img/arrow-2-7@2x.png",
  line32: "/img/line-3-2.png",
  arrow5: "/img/arrow-5-5@2x.png",
  arrow6: "/img/arrow-5-5@2x.png",
  modeling: "Modeling",
  nextStep: "Next Step",
  navItems452Props: navItems452Data,
  tableHeaderProps: tableHeader1Data,
  crewMemberProps: crewMember1Data,
  crewMember2Props: crewMember21Data,
  crewMember3Props: crewMember31Data,
  crewMember4Props: crewMember41Data,
  crewMember5Props: crewMember51Data,
};

const headerMenuDefault1Data = {
  children: "Get Started ->",
};

const frame117222Data = {
  children: "Existing Case",
};

const frame116222Data = {
  children: "Reference Cases",
};

const frame11Data = {
  src: "/img/unsplash-ym--msbz0ro.png",
};

const frame13Data = {
  src: "/img/unsplash-ym--msbz0ro-2.png",
  className: "frame-6-1",
};

const frame14Data = {
  src: "/img/unsplash-ym--msbz0ro-1.png",
  className: "frame-5-2",
};

const homeData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  takeYourCompanyToTheNextLevel: (
    <React.Fragment>
      Take your
      <br />
      Company to the
      <br />
      next level
    </React.Fragment>
  ),
  discoverFromDiffer:
    "Discover from differentes cases the ideal form of your company’s Supply Chain.",
  newCase: "NEW CASE",
  existingCase: (
    <React.Fragment>
      EXISTING
      <br /> CASE
    </React.Fragment>
  ),
  referenceCase: "REFERENCE CASE",
  headerMenuDefaultProps: headerMenuDefault1Data,
  frame11722Props: frame117222Data,
  frame11622Props: frame116222Data,
  frame11Props: frame11Data,
  frame12Props: frame13Data,
  frame13Props: frame14Data,
};

const frame116223Data = {
  children: "Decisional Model",
};

const frame117223Data = {
  children: "Process view",
};

const frame1181Data = {
  children: "Informational model",
};

const navItems41Data = {
  frame1162Props: frame116223Data,
  frame1172Props: frame117223Data,
  frame118Props: frame1181Data,
};

const functionalView1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  acquisition: "Acquisition",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "Controllers",
  arrow5: "/img/arrow-5@2x.png",
  label4: "Input",
  arrow6: "/img/arrow-6@2x.png",
  label5: "Resources",
  arrow8: "/img/arrow-8@2x.png",
  label6: "Constrains",
  label7: "Output",
  arrow3: "/img/arrow-3@2x.png",
  arrow4: "/img/arrow-4@2x.png",
  arrow7: "/img/arrow-7@2x.png",
  label8: "Resources",
  arrow9: "/img/arrow-9@2x.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  navItems4Props: navItems41Data,
};

const frame117224Data = {
  children: "Existing Case",
};

const frame116224Data = {
  children: "Reference Cases",
};

const frame113224Data = {
  className: "",
};

const navItems31Data = {
  frame1172Props: frame117224Data,
  frame1162Props: frame116224Data,
  frame1132Props: frame113224Data,
};

const acquisitionData = {
  ellipse116: "/img/polygon-3@2x.png",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  companyName: "Company Name",
  inputType1: "text",
  inputPlaceholder1: "Tap here",
  companySize: "Company Size",
  inputType2: "number",
  inputPlaceholder2: "Tap here",
  activitySector: "Activity sector",
  inputType3: "text",
  inputPlaceholder3: "Tap here",
  measuringForm: "Measuring Form",
  navItems3Props: navItems31Data,
};

const frame116225Data = {
  children: "Decisional Model",
};

const frame117225Data = {
  children: "Process view",
};

const frame1182Data = {
  children: "Informational model",
};

const physicalModel1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  acquisition: "Acquisition",
  functionalView: "Functional view",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "Cut",
  arrow5: "/img/arrow-5@2x.png",
  label4: "Wood",
  arrow6: "/img/arrow-6@2x.png",
  label5: "Assembling",
  label6: "Tables",
  arrow3: "/img/arrow-3@2x.png",
  arrow4: "/img/arrow-4@2x.png",
  arrow7: "/img/arrow-7@2x.png",
  label7: "Machines",
  arrow8: "/img/arrow-8@2x.png",
  label8: "Workers",
  arrow9: "/img/arrow-9@2x.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  frame11622Props: frame116225Data,
  frame11722Props: frame117225Data,
  frame118Props: frame1182Data,
};

const frame116226Data = {
  children: "Reference Cases",
};

const existingCaseData = {
  frame11622Props: frame116226Data,
};

const frame117226Data = {
  children: "Process view",
};

const frame1183Data = {
  children: "Informational model",
};

const decisionalModel1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  acquisition: "Acquisition",
  functionalView: "Functional view",
  arrow3: "/img/arrow-1@2x.png",
  arrow4: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  modeling: "Modeling",
  xcontinue: "Continue",
  frame11722Props: frame117226Data,
  frame118Props: frame1183Data,
};

const frame116227Data = {
  children: "Decisional Model",
};

const frame1184Data = {
  children: "Informational model",
};

const processView1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  acquisition: "Acquisition",
  functionalView: "Functional view",
  arrow1: "/img/arrow-1-2@2x.png",
  arrow2: "/img/arrow-2-2@2x.png",
  rectangle7: "/img/rectangle-7@2x.png",
  line3: "/img/line-3@2x.png",
  line4: "/img/line-4@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnFlexsimB: "CLICK ON “FLEXSIM” BUTTON TO OPEN VMWARE HORIZON",
  overlapGroup1: "/img/rectangle-4@2x.png",
  cut: "Cut",
  label3: "Design",
  rectangle5: "/img/rectangle-5@2x.png",
  manufacturing: "Manufacturing",
  arrow6: "/img/arrow-6-2@2x.png",
  arrow11: "/img/arrow-11@2x.png",
  label4: "Machine",
  arrow8: "/img/arrow-8-2@2x.png",
  label5: "Human",
  arrow9: "/img/arrow-9-2@2x.png",
  flexsim: "Flexsim",
  rectangle6: "/img/rectangle-6@2x.png",
  assembly: "Assembly",
  arrow10: "/img/arrow-10@2x.png",
  xcontinue: "Continue",
  frame11622Props: frame116227Data,
  frame118Props: frame1184Data,
};

const frame116228Data = {
  children: "Decisional Model",
};

const frame117227Data = {
  children: "Process view",
};

const frame11362Data = {
  children: "Informational model",
};

const tableHeader7Data = {
  children: "",
};

const tableHeader8Data = {
  children: "Company",
  className: "table-header-1-1",
};

const tableNumberBase46Data = {
  bottomLine: "/img/bottom-line-3@2x.png",
  leftLine: "/img/left-line-3@2x.png",
  rightLine: "/img/right-line-3@2x.png",
  className: "table-number-base-7-1",
};

const tableNumberPrimaryKey26Data = {
  tableNumberBase4Props: tableNumberBase46Data,
};

const key15Data = {
  className: "key-14",
};

const tableNumberBase55Data = {
  type: "property1:string",
  bottomLine: "/img/bottom-line-4@2x.png",
  leftLine: "/img/left-line-4@2x.png",
  rightLine: "/img/right-line-4@2x.png",
  className: "table-number-base-9-1",
  keyProps: key15Data,
};

const tableTextBase25Data = {
  tableNumberBase5Props: tableNumberBase55Data,
};

const key16Data = {
  className: "key-15",
};

const tableNumberBase65Data = {
  bottomLine: "/img/bottom-line-5@2x.png",
  leftLine: "/img/left-line-5@2x.png",
  rightLine: "/img/right-line-5@2x.png",
  className: "table-number-base-13",
  keyProps: key16Data,
};

const tableNumberBaseNull25Data = {
  tableNumberBase6Props: tableNumberBase65Data,
};

const tableTextBaseNull25Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull25Data,
};

const crewMember6Data = {
  tableHeaderProps: tableHeader8Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey26Data,
  tableTextBase2Props: tableTextBase25Data,
  tableTextBaseNull2Props: tableTextBaseNull25Data,
};

const tableHeader9Data = {
  children: "Insurances",
  className: "table-header-1-2",
};

const tableNumberBase47Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "",
};

const tableNumberPrimaryKey27Data = {
  tableNumberBase4Props: tableNumberBase47Data,
};

const key17Data = {
  className: "key-16",
};

const tableNumberBase72Data = {
  keyProps: key17Data,
};

const tableTextBase32Data = {
  tableNumberBase7Props: tableNumberBase72Data,
};

const key18Data = {
  className: "key-17",
};

const tableNumberBase66Data = {
  bottomLine: "/img/bottom-line-2@2x.png",
  leftLine: "/img/left-line-2@2x.png",
  rightLine: "/img/right-line-2@2x.png",
  className: "",
  keyProps: key18Data,
};

const tableNumberBaseNull26Data = {
  tableNumberBase6Props: tableNumberBase66Data,
};

const tableTextBaseNull26Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull26Data,
};

const crewMember22Data = {
  tableHeaderProps: tableHeader9Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey27Data,
  tableTextBase3Props: tableTextBase32Data,
  tableTextBaseNull2Props: tableTextBaseNull26Data,
};

const tableHeader10Data = {
  children: "Cars",
  className: "table-header-1-3",
};

const tableNumberBase48Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "table-number-base-7-2",
};

const tableNumberPrimaryKey28Data = {
  tableNumberBase4Props: tableNumberBase48Data,
};

const key19Data = {
  className: "key-18",
};

const tableNumberBase56Data = {
  type: "registrationplate:string",
  bottomLine: "/img/bottom-line-10@2x.png",
  leftLine: "/img/left-line-10@2x.png",
  rightLine: "/img/right-line-10@2x.png",
  className: "table-number-base-11",
  keyProps: key19Data,
};

const tableTextBase26Data = {
  className: "table-text-base-6",
  tableNumberBase5Props: tableNumberBase56Data,
};

const key20Data = {
  className: "key-19",
};

const tableNumberBase82Data = {
  keyProps: key20Data,
};

const tableNumberBaseNull32Data = {
  tableNumberBase8Props: tableNumberBase82Data,
};

const tableTextBaseNull32Data = {
  tableNumberBaseNull3Props: tableNumberBaseNull32Data,
};

const crewMember32Data = {
  tableHeaderProps: tableHeader10Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey28Data,
  tableTextBase2Props: tableTextBase26Data,
  tableTextBaseNull3Props: tableTextBaseNull32Data,
};

const tableHeader11Data = {
  children: "Employees",
  className: "table-header-1-4",
};

const tableNumberBase49Data = {
  bottomLine: "/img/bottom-line-12@2x.png",
  leftLine: "/img/left-line-12@2x.png",
  rightLine: "/img/right-line-12@2x.png",
  className: "table-number-base-7",
};

const tableNumberPrimaryKey29Data = {
  tableNumberBase4Props: tableNumberBase49Data,
};

const key21Data = {
  className: "key-20",
};

const tableNumberBase57Data = {
  type: "name:string",
  bottomLine: "/img/bottom-line-13@2x.png",
  leftLine: "/img/left-line-13@2x.png",
  rightLine: "/img/right-line-13@2x.png",
  className: "table-number-base-9-2",
  keyProps: key21Data,
};

const tableTextBase27Data = {
  tableNumberBase5Props: tableNumberBase57Data,
};

const key22Data = {
  className: "key-21",
};

const tableNumberBase67Data = {
  bottomLine: "/img/bottom-line-14@2x.png",
  leftLine: "/img/left-line-14@2x.png",
  rightLine: "/img/right-line-14@2x.png",
  className: "",
  keyProps: key22Data,
};

const tableNumberBaseNull27Data = {
  tableNumberBase6Props: tableNumberBase67Data,
};

const tableTextBaseNull27Data = {
  tableNumberBaseNull2Props: tableNumberBaseNull27Data,
};

const crewMember42Data = {
  tableHeaderProps: tableHeader11Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey29Data,
  tableTextBase2Props: tableTextBase27Data,
  tableTextBaseNull2Props: tableTextBaseNull27Data,
};

const tableHeader12Data = {
  children: "Bonus",
  className: "table-header-1",
};

const tableNumberBase410Data = {
  bottomLine: "/img/bottom-line@2x.png",
  leftLine: "/img/left-line@2x.png",
  rightLine: "/img/right-line@2x.png",
  className: "",
};

const tableNumberPrimaryKey210Data = {
  tableNumberBase4Props: tableNumberBase410Data,
};

const key23Data = {
  className: "key-22",
};

const tableNumberBase58Data = {
  type: "amount:int32",
  bottomLine: "/img/bottom-line-1@2x.png",
  leftLine: "/img/left-line-1@2x.png",
  rightLine: "/img/right-line-1@2x.png",
  className: "table-number-base-9",
  keyProps: key23Data,
};

const tableTextBase28Data = {
  className: "table-text-base-7",
  tableNumberBase5Props: tableNumberBase58Data,
};

const key24Data = {
  className: "key-23",
};

const tableNumberBase68Data = {
  bottomLine: "/img/bottom-line-2@2x.png",
  leftLine: "/img/left-line-2@2x.png",
  rightLine: "/img/right-line-2@2x.png",
  className: "",
  keyProps: key24Data,
};

const tableNumberBaseNull28Data = {
  tableNumberBase6Props: tableNumberBase68Data,
};

const tableTextBaseNull28Data = {
  className: "table-text-base-null-5",
  tableNumberBaseNull2Props: tableNumberBaseNull28Data,
};

const crewMember52Data = {
  tableHeaderProps: tableHeader12Data,
  tableNumberPrimaryKey2Props: tableNumberPrimaryKey210Data,
  tableTextBase2Props: tableTextBase28Data,
  tableTextBaseNull2Props: tableTextBaseNull28Data,
};

const informationalModel1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  acquisition: "Acquisition",
  functionalView: "Functional view",
  arrow7: "/img/arrow-1-2@2x.png",
  arrow8: "/img/arrow-2-2@2x.png",
  line31: "/img/line-3@2x.png",
  line4: "/img/line-4@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  arrow1: "/img/arrow-1-7@2x.png",
  arrow2: "/img/arrow-2-7@2x.png",
  line32: "/img/line-3-2.png",
  arrow5: "/img/arrow-5-5@2x.png",
  arrow6: "/img/arrow-5-5@2x.png",
  modeling: "Modeling",
  goOnToTheNextPage: "Next",
  frame11622Props: frame116228Data,
  frame11722Props: frame117227Data,
  frame1136Props: frame11362Data,
  tableHeaderProps: tableHeader7Data,
  crewMemberProps: crewMember6Data,
  crewMember2Props: crewMember22Data,
  crewMember3Props: crewMember32Data,
  crewMember4Props: crewMember42Data,
  crewMember5Props: crewMember52Data,
};

const frame117228Data = {
  children: "Existing Case",
};

const frame116229Data = {
  children: "Reference Cases",
};

const frame1132210Data = {
  className: "frame-113-14",
};

const navItems32Data = {
  className: "nav-items-3-2",
  frame1172Props: frame117228Data,
  frame1162Props: frame116229Data,
  frame1132Props: frame1132210Data,
};

const buttonSecondary1Data = {
  children: "Démarche Environnementale 1",
  className: "",
};

const toggle1Data = {
  buttonSecondaryProps: buttonSecondary1Data,
};

const ouinon1Data = {
  yes: "Yes",
  place: "No",
};

const frame1361Data = {
  ouinonProps: ouinon1Data,
};

const group901Data = {
  children: "Avez-vous des objectifs environnementaux planifiés et réalisés ?",
};

const ouinon2Data = {
  yes: "Yes",
  place: "No",
};

const frame1362Data = {
  ouinonProps: ouinon2Data,
};

const group902Data = {
  children:
    "Quel est le pourcentage d’objectifs réalisés sur les objectifs planifiés?",
};

const ouinon3Data = {
  yes: "Yes",
  place: "No",
};

const frame1363Data = {
  className: "frame-138",
  ouinonProps: ouinon3Data,
};

const buttonSecondary2Data = {
  children: "Démarche Environnementale 2",
  className: "",
};

const toggle2Data = {
  className: "toggle-33",
  buttonSecondaryProps: buttonSecondary2Data,
};

const ouinon4Data = {
  yes: "Yes",
  place: "No",
};

const frame1364Data = {
  ouinonProps: ouinon4Data,
};

const ouinon5Data = {
  yes: "Yes",
  place: "No",
};

const frame1365Data = {
  ouinonProps: ouinon5Data,
};

const ouinon6Data = {
  yes: "Yes",
  place: "No",
};

const frame1366Data = {
  ouinonProps: ouinon6Data,
};

const buttonSecondary3Data = {
  children: "1/5",
  className: "button-secondary-52",
};

const toggle3Data = {
  className: "x15",
  buttonSecondaryProps: buttonSecondary3Data,
};

const environmental1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1-19@2x.png",
  pleaseAnswerTheFollowingQuestions:
    "PLEASE ANSWER THE FOLLOWING QUESTIONS ON THE FORM",
  grezVousLesRisqu:
    "Gérez vous les risques et impacts de votre activité sur l'environnement?",
  inputType1: "text",
  inputPlaceholder1:
    "En moyenne dans quelle périmètre vous approvisionnez vous?",
  inputType2: "text",
  inputPlaceholder2:
    "Connaissez vous le tonnage du transport des produits de vos fournisseurs externes?",
  inputType3: "text",
  inputPlaceholder3:
    "Connaissez vous le tonnage du transport des produits de vos fournisseurs externes?",
  navItems3Props: navItems32Data,
  toggle1Props: toggle1Data,
  frame1361Props: frame1361Data,
  group901Props: group901Data,
  frame1362Props: frame1362Data,
  group902Props: group902Data,
  frame1363Props: frame1363Data,
  toggle2Props: toggle2Data,
  frame1364Props: frame1364Data,
  frame1365Props: frame1365Data,
  frame1366Props: frame1366Data,
  toggle3Props: toggle3Data,
};

const frame117229Data = {
  children: "Existing Case",
};

const frame1162210Data = {
  children: "Reference Cases",
};

const frame1132211Data = {
  className: "",
};

const navItems33Data = {
  className: "nav-items-3-3",
  frame1172Props: frame117229Data,
  frame1162Props: frame1162210Data,
  frame1132Props: frame1132211Data,
};

const measuringFormData = {
  ellipse116: "/img/polygon-3@2x.png",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  criteriaMeasurementForm: "CRITERIA MEASUREMENT FORM",
  environnementCriteria1: "Environnement criteria",
  environnementCriteria2: "Environnement criteria",
  x4LeadTimeCriteria: "4. Lead time criteria",
  x2SocialCriteria: "2. Social Criteria",
  x5CostCriteria: "5. Cost criteria",
  x3ModernizationCriteria: "3. Modernization criteria",
  x6QualityCriteria: "6. Quality criteria",
  navItems3Props: navItems33Data,
};

const frame1185Data = {
  children: "Visual management",
  className: "frame-113-23",
};

const headerMenuDefault321Data = {
  inputPlaceholder: (
    <React.Fragment>
      Definition de
      <br /> la famille
      <br /> de produits
    </React.Fragment>
  ),
};

const headerMenuDefault322Data = {
  inputPlaceholder: "VSM Actuel",
  className: "menu-item-default-14",
};

const menuItemDefaultData = {
  headerMenuDefault3Props: headerMenuDefault322Data,
};

const headerMenuDefault323Data = {
  inputPlaceholder: "Analysis",
  className: "menu-item-default-15",
};

const headerMenuDefault324Data = {
  inputPlaceholder: "VSM Futur",
  className: "menu-item-default-16",
};

const headerMenuDefault325Data = {
  inputPlaceholder: "Plan d’action",
  className: "menu-item-default-17",
};

const leanVSM1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  leanVsm: "Lean VSM",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  rectangle6: "/img/rectangle-7@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  arrow3: "/img/arrow-3-4@2x.png",
  modeling: "Modeling",
  arrow4: "/img/arrow-4-4@2x.png",
  arrow6: "/img/arrow-4-4@2x.png",
  arrow5: "/img/arrow-5-3@2x.png",
  rectangle7: "/img/rectangle-7-1@2x.png",
  xcontinue: "Continue",
  frame118Props: frame1185Data,
  headerMenuDefault321Props: headerMenuDefault321Data,
  menuItemDefaultProps: menuItemDefaultData,
  headerMenuDefault322Props: headerMenuDefault323Data,
  headerMenuDefault323Props: headerMenuDefault324Data,
  headerMenuDefault324Props: headerMenuDefault325Data,
};

const frame1186Data = {
  children: "Visual management",
  className: "frame-113-26",
};

const x5S1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  rectangle6: "/img/rectangle-7@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  seiri: "SEIRI",
  arrow7: "/img/arrow-7-6@2x.png",
  inputType1: "text",
  inputPlaceholder1: "ELIMINER",
  arrow3: "/img/arrow-3-4@2x.png",
  seiton: "SEITON",
  arrow8: "/img/arrow-8-8@2x.png",
  inputType2: "text",
  inputPlaceholder2: "RANGER",
  modeling: "Modeling",
  arrow4: "/img/arrow-4-4@2x.png",
  seison: "SEISON",
  arrow9: "/img/arrow-7-6@2x.png",
  inputType3: "text",
  inputPlaceholder3: "NETTOYER",
  arrow6: "/img/arrow-4-4@2x.png",
  seiketsu: "SEIKETSU",
  shitsuke: "SHITSUKE",
  arrow10: "/img/arrow-8-8@2x.png",
  arrow11: "/img/arrow-8-8@2x.png",
  arrow5: "/img/arrow-5-3@2x.png",
  rectangle7: "/img/rectangle-7-1@2x.png",
  inputType4: "text",
  inputPlaceholder4: "STANDARDISER",
  inputType5: "text",
  inputPlaceholder5: "RESPECTER",
  xcontinue: "Continue",
  frame118Props: frame1186Data,
};

const frame1172210Data = {
  children: "Existing Case",
};

const frame1162211Data = {
  children: "Reference Cases",
};

const frame1132214Data = {
  className: "",
};

const navItems34Data = {
  className: "nav-items-3-4",
  frame1172Props: frame1172210Data,
  frame1162Props: frame1162211Data,
  frame1132Props: frame1132214Data,
};

const frame113324Data = {
  className: "frame-113-3",
};

const headerMenuDefault21Data = {
  children: "Results & Objectives",
  className: "",
};

const frame2321Data = {
  headerMenuDefault2Props: headerMenuDefault21Data,
};

const frame222Data = {
  children: "Continue",
};

const analysisData = {
  analysis: "Analysis",
  label: "Design",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  place: "Back",
  formalismesEnFonct: "FORMALISMES EN FONCTION DES PROBLÈMES TROUVÉS",
  navItems3Props: navItems34Data,
  frame11332Props: frame113324Data,
  frame232Props: frame2321Data,
  frame222Props: frame222Data,
};

const frame11363Data = {
  children: "Visual management",
  className: "frame-113-5",
};

const buttonSecondary4Data = {
  children: "Analysis",
  className: "button-secondary-53",
};

const toggle4Data = {
  className: "finish",
  buttonSecondaryProps: buttonSecondary4Data,
};

const visualManagement1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  inputType1: "text",
  inputPlaceholder1: (
    <React.Fragment>
      Connaissances
      <br />
      Competences
    </React.Fragment>
  ),
  inputType2: "text",
  inputPlaceholder2: (
    <React.Fragment>
      Collaborateurs
      <br />
      Equipes
    </React.Fragment>
  ),
  inputType3: "text",
  inputPlaceholder3: (
    <React.Fragment>
      Strategies
      <br />
      Projets
    </React.Fragment>
  ),
  inputType4: "text",
  inputPlaceholder4: (
    <React.Fragment>
      Idees
      <br />
      Informations
    </React.Fragment>
  ),
  inputType5: "text",
  inputPlaceholder5: (
    <React.Fragment>
      Temps <br />
      Priorites
    </React.Fragment>
  ),
  arrow11: "/img/arrow-11-1@2x.png",
  arrow16: "/img/arrow-16@2x.png",
  arrow13: "/img/arrow-13@2x.png",
  arrow14: "/img/arrow-14@2x.png",
  inputType6: "text",
  inputPlaceholder6: (
    <React.Fragment>
      Mieux
      <br /> Manager
    </React.Fragment>
  ),
  arrow12: "/img/arrow-12@2x.png",
  arrow15: "/img/arrow-15@2x.png",
  inputType7: "text",
  inputPlaceholder7: (
    <React.Fragment>
      Problemes
      <br />
      Decision
    </React.Fragment>
  ),
  modeling: "Modeling",
  frame1136Props: frame11363Data,
  toggleProps: toggle4Data,
};

const frame1162212Data = {
  children: "Decisional Model",
};

const frame1172211Data = {
  children: "Process view",
};

const frame1187Data = {
  children: "Informational model",
};

const navItems42Data = {
  className: "nav-items-4-2",
  frame1162Props: frame1162212Data,
  frame1172Props: frame1172211Data,
  frame118Props: frame1187Data,
};

const functionalViewData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "Controllers",
  arrow5: "/img/arrow-5@2x.png",
  label4: "Input",
  arrow6: "/img/arrow-6@2x.png",
  label5: "Resources",
  arrow8: "/img/arrow-8@2x.png",
  modeling: "Modeling",
  label6: "Constrains",
  label7: "Output",
  arrow3: "/img/arrow-3@2x.png",
  arrow4: "/img/arrow-4@2x.png",
  arrow7: "/img/arrow-7@2x.png",
  label8: "Resources",
  arrow9: "/img/arrow-9-3@2x.png",
  xcontinue: "Continue",
  navItems4Props: navItems42Data,
};

const frame1172212Data = {
  children: "Existing Case",
};

const frame1162213Data = {
  children: "Reference Cases",
};

const frame1132217Data = {
  className: "",
};

const navItems35Data = {
  className: "nav-items-3-5",
  frame1172Props: frame1172212Data,
  frame1162Props: frame1162213Data,
  frame1132Props: frame1132217Data,
};

const frame113327Data = {
  className: "frame-113-6",
};

const navItems222Data = {
  frame11332Props: frame113327Data,
};

const pricing31Data = {
  cost: "Cost",
};

const pricing32Data = {
  cost: "Modernization",
  className: "pricing-8",
};

const pricing33Data = {
  cost: "Social",
  className: "pricing-5",
};

const pricing34Data = {
  cost: "Client/Consumer",
  className: "pricing-7",
};

const objectivesData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  place1: "Back",
  notesAtteindre: "NOTES À ATTEINDRE",
  place2: "Quality",
  inputType1: "text",
  inputPlaceholder1: "      /25",
  line211: "/img/line-21@2x.png",
  leadTime: "Lead Time",
  inputType2: "text",
  inputPlaceholder2: "      /25",
  line212: "/img/line-21-5@2x.png",
  environment: "Environment",
  inputType3: "text",
  inputPlaceholder3: "      /25",
  line213: "/img/line-21-5@2x.png",
  xcontinue: "Continue",
  navItems3Props: navItems35Data,
  navItems22Props: navItems222Data,
  pricing31Props: pricing31Data,
  pricing32Props: pricing32Data,
  pricing33Props: pricing33Data,
  pricing34Props: pricing34Data,
};

const frame1162214Data = {
  children: "Decisional Model",
};

const frame1172213Data = {
  children: "Process view",
};

const frame1188Data = {
  children: "Informational model",
};

const navItems422Data = {
  frame1162Props: frame1162214Data,
  frame1172Props: frame1172213Data,
  frame118Props: frame1188Data,
};

const physicalModelData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "Cut",
  arrow5: "/img/arrow-5@2x.png",
  label4: "Wood",
  arrow6: "/img/arrow-6@2x.png",
  label5: "Machines",
  arrow8: "/img/arrow-8@2x.png",
  modeling: "Modeling",
  label6: "Assembling",
  label7: "Tables",
  arrow3: "/img/arrow-3@2x.png",
  arrow4: "/img/arrow-4@2x.png",
  arrow7: "/img/arrow-7@2x.png",
  label8: "Workers",
  arrow9: "/img/arrow-9-3@2x.png",
  xcontinue: "Continue",
  navItems42Props: navItems422Data,
};

const frame1172214Data = {
  children: "Process view",
};

const frame1189Data = {
  children: "Informational model",
};

const navItems43Data = {
  frame1172Props: frame1172214Data,
  frame118Props: frame1189Data,
};

const decisionalModelData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  arrow3: "/img/arrow-1@2x.png",
  arrow4: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  modeling: "Modeling",
  xcontinue: "Continue",
  navItems43Props: navItems43Data,
};

const frame1162215Data = {
  children: "Decisional Model",
};

const frame11810Data = {
  children: "Informational model",
};

const navItems44Data = {
  frame1162Props: frame1162215Data,
  frame118Props: frame11810Data,
};

const processViewData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  arrow1: "/img/arrow-1-2@2x.png",
  arrow2: "/img/arrow-2-2@2x.png",
  rectangle7: "/img/rectangle-7@2x.png",
  line3: "/img/line-3@2x.png",
  line4: "/img/line-4@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnFlexsimB: "CLICK ON “FLEXSIM” BUTTON TO OPEN VMWARE HORIZON",
  overlapGroup2: "/img/rectangle-4@2x.png",
  cut: "Cut",
  label3: "Design",
  rectangle5: "/img/rectangle-5@2x.png",
  manufacturing: "Manufacturing",
  arrow6: "/img/arrow-6-2@2x.png",
  arrow11: "/img/arrow-11@2x.png",
  label4: "Machine",
  arrow8: "/img/arrow-8-2@2x.png",
  label5: "Human",
  arrow9: "/img/arrow-9-2@2x.png",
  spanText1: "F",
  spanText2: "lexsim",
  rectangle6: "/img/rectangle-6@2x.png",
  assembly: "Assembly",
  arrow10: "/img/arrow-10@2x.png",
  xcontinue: "Continue",
  navItems44Props: navItems44Data,
};

const frame114322Data = {
  className: "frame-114-87",
};

const frame11527Data = {
  className: "frame-115-105",
};

const headerMenuDefault22Data = {
  children: "Existing case",
};

const frame1132221Data = {
  className: "frame-113-29",
};

const frame11445Data = {
  className: "frame-114-98",
};

const headerMenuDefault23Data = {
  children: "Results & Objectives",
  className: "",
};

const frame2322Data = {
  headerMenuDefault2Props: headerMenuDefault23Data,
};

const buttonSecondary5Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-27",
};

const toggle5Data = {
  className: "toggle-7",
  buttonSecondaryProps: buttonSecondary5Data,
};

const group1021Data = {
  line24: "/img/line-24.png",
  className: "",
};

const group1022Data = {
  line24: "/img/line-24-1.png",
  className: "",
};

const group1023Data = {
  line24: "/img/line-24-12.png",
  className: "",
};

const group1024Data = {
  line24: "/img/line-24-3.png",
  className: "",
};

const group1025Data = {
  line24: "/img/line-24-4.png",
  className: "",
};

const frame1011Data = {
  toggleProps: toggle5Data,
  group1021Props: group1021Data,
  group1022Props: group1022Data,
  group1023Props: group1023Data,
  group1024Props: group1024Data,
  group1025Props: group1025Data,
};

const buttonSecondary6Data = {
  children: "1/2",
  className: "button-secondary-27",
};

const toggle6Data = {
  className: "toggle-34",
  buttonSecondaryProps: buttonSecondary6Data,
};

const buttonSecondary7Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-27",
};

const toggle7Data = {
  className: "toggle-7",
  buttonSecondaryProps: buttonSecondary7Data,
};

const group1026Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group1027Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group1028Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group1029Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group10210Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame1021Data = {
  toggleProps: toggle7Data,
  group1021Props: group1026Data,
  group1022Props: group1027Data,
  group1023Props: group1028Data,
  group1024Props: group1029Data,
  group1025Props: group10210Data,
};

const frame117323Data = {
  className: "frame-116-157",
};

const sMED2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  label1: "Reference case",
  acquisition: "Acquisition",
  analysis: "Analysis",
  label2: "Design",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  frame11432Props: frame114322Data,
  frame1152Props: frame11527Data,
  headerMenuDefault2Props: headerMenuDefault22Data,
  frame11322Props: frame1132221Data,
  frame1144Props: frame11445Data,
  frame232Props: frame2322Data,
  frame101Props: frame1011Data,
  toggleProps: toggle6Data,
  frame102Props: frame1021Data,
  frame11732Props: frame117323Data,
};

const navItems23Data = {
  className: "nav-items-2-4",
};

const frame1172215Data = {
  children: "Existing Case",
};

const frame1162216Data = {
  children: "Reference Cases",
};

const frame1132222Data = {
  className: "",
};

const navItems36Data = {
  className: "nav-items-3-6",
  frame1172Props: frame1172215Data,
  frame1162Props: frame1162216Data,
  frame1132Props: frame1132222Data,
};

const buttonSecondary8Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-28",
};

const toggle8Data = {
  className: "toggle-8",
  buttonSecondaryProps: buttonSecondary8Data,
};

const group10211Data = {
  line24: "/img/line-24.png",
  className: "",
};

const group10212Data = {
  line24: "/img/line-24-1.png",
  className: "",
};

const group10213Data = {
  line24: "/img/line-24-12.png",
  className: "",
};

const group10214Data = {
  line24: "/img/line-24-3.png",
  className: "",
};

const group10215Data = {
  line24: "/img/line-24-4.png",
  className: "",
};

const frame1012Data = {
  className: "frame-97",
  toggleProps: toggle8Data,
  group1021Props: group10211Data,
  group1022Props: group10212Data,
  group1023Props: group10213Data,
  group1024Props: group10214Data,
  group1025Props: group10215Data,
};

const buttonSecondary9Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-28",
};

const toggle9Data = {
  className: "toggle-8",
  buttonSecondaryProps: buttonSecondary9Data,
};

const group10216Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10217Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10218Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group10219Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group10220Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame1022Data = {
  className: "frame-98",
  toggleProps: toggle9Data,
  group1021Props: group10216Data,
  group1022Props: group10217Data,
  group1023Props: group10218Data,
  group1024Props: group10219Data,
  group1025Props: group10220Data,
};

const buttonSecondary10Data = {
  children: "2/2",
  className: "button-secondary-28",
};

const toggle10Data = {
  className: "toggle-35",
  buttonSecondaryProps: buttonSecondary10Data,
};

const sMED3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  visualManagement: "Visual Management",
  navItems2Props: navItems23Data,
  navItems3Props: navItems36Data,
  frame101Props: frame1012Data,
  frame102Props: frame1022Data,
  toggleProps: toggle10Data,
};

const navItems24Data = {
  className: "nav-items-2-5",
};

const frame1172216Data = {
  children: "Existing Case",
};

const frame1162217Data = {
  children: "Reference Cases",
};

const frame1132223Data = {
  className: "",
};

const navItems37Data = {
  className: "nav-items-3-7",
  frame1172Props: frame1172216Data,
  frame1162Props: frame1162217Data,
  frame1132Props: frame1132223Data,
};

const buttonSecondary11Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-29",
};

const toggle11Data = {
  className: "toggle-9",
  buttonSecondaryProps: buttonSecondary11Data,
};

const group10221Data = {
  line24: "/img/line-24.png",
  className: "",
};

const group10222Data = {
  line24: "/img/line-24-1.png",
  className: "",
};

const group10223Data = {
  line24: "/img/line-24-2.png",
  className: "",
};

const group10224Data = {
  line24: "/img/line-24-3.png",
  className: "",
};

const group10225Data = {
  line24: "/img/line-24-4.png",
  className: "",
};

const frame1013Data = {
  toggleProps: toggle11Data,
  group1021Props: group10221Data,
  group1022Props: group10222Data,
  group1023Props: group10223Data,
  group1024Props: group10224Data,
  group1025Props: group10225Data,
};

const buttonSecondary12Data = {
  children: "1/2",
  className: "button-secondary-29",
};

const toggle12Data = {
  className: "toggle-36",
  buttonSecondaryProps: buttonSecondary12Data,
};

const buttonSecondary13Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-29",
};

const toggle13Data = {
  className: "toggle-9",
  buttonSecondaryProps: buttonSecondary13Data,
};

const group10226Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10227Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10228Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group10229Data = {
  line24: "/img/line-24-8.png",
  className: "",
};

const group10230Data = {
  line24: "/img/line-24-9.png",
  className: "",
};

const frame1023Data = {
  toggleProps: toggle13Data,
  group1021Props: group10226Data,
  group1022Props: group10227Data,
  group1023Props: group10228Data,
  group1024Props: group10229Data,
  group1025Props: group10230Data,
};

const frame117324Data = {
  className: "frame-117-75",
};

const visualManagement2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems24Data,
  navItems3Props: navItems37Data,
  frame101Props: frame1013Data,
  toggleProps: toggle12Data,
  frame102Props: frame1023Data,
  frame11732Props: frame117324Data,
};

const navItems25Data = {
  className: "nav-items-2-6",
};

const frame1172217Data = {
  children: "Existing Case",
};

const frame1162218Data = {
  children: "Reference Cases",
};

const frame1132224Data = {
  className: "",
};

const navItems38Data = {
  className: "nav-items-3-8",
  frame1172Props: frame1172217Data,
  frame1162Props: frame1162218Data,
  frame1132Props: frame1132224Data,
};

const buttonSecondary14Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-30",
};

const toggle14Data = {
  className: "toggle-10",
  buttonSecondaryProps: buttonSecondary14Data,
};

const group10231Data = {
  line24: "/img/line-24.png",
  className: "",
};

const group10232Data = {
  line24: "/img/line-24-1.png",
  className: "group-3-2",
};

const group10233Data = {
  line24: "/img/line-24-32.png",
  className: "group-3-3",
};

const group10234Data = {
  line24: "/img/line-24-3.png",
  className: "group-3-4",
};

const group10235Data = {
  line24: "/img/line-24-4.png",
  className: "group-3-5",
};

const frame1014Data = {
  className: "frame-97-1",
  toggleProps: toggle14Data,
  group1021Props: group10231Data,
  group1022Props: group10232Data,
  group1023Props: group10233Data,
  group1024Props: group10234Data,
  group1025Props: group10235Data,
};

const buttonSecondary15Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-30",
};

const toggle15Data = {
  className: "toggle-10",
  buttonSecondaryProps: buttonSecondary15Data,
};

const group10236Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10237Data = {
  line24: "/img/line-24-6.png",
  className: "group-3-6",
};

const group10238Data = {
  line24: "/img/line-24-7.png",
  className: "group-3-7",
};

const group10239Data = {
  line24: "/img/line-24-18.png",
  className: "group-3-8",
};

const group10240Data = {
  line24: "/img/line-24-19.png",
  className: "group-3",
};

const frame1024Data = {
  className: "frame-98-1",
  toggleProps: toggle15Data,
  group1021Props: group10236Data,
  group1022Props: group10237Data,
  group1023Props: group10238Data,
  group1024Props: group10239Data,
  group1025Props: group10240Data,
};

const buttonSecondary16Data = {
  children: "2/2",
  className: "button-secondary-30",
};

const toggle16Data = {
  className: "toggle-37",
  buttonSecondaryProps: buttonSecondary16Data,
};

const kaizen3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  smed: "SMED",
  navItems2Props: navItems25Data,
  navItems3Props: navItems38Data,
  frame101Props: frame1014Data,
  frame102Props: frame1024Data,
  toggleProps: toggle16Data,
};

const navItems26Data = {
  className: "nav-items-2-7",
};

const frame1172218Data = {
  children: "Existing Case",
};

const frame1162219Data = {
  children: "Reference Cases",
};

const frame1132225Data = {
  className: "",
};

const navItems39Data = {
  className: "nav-items-3-9",
  frame1172Props: frame1172218Data,
  frame1162Props: frame1162219Data,
  frame1132Props: frame1132225Data,
};

const buttonSecondary17Data = {
  children: "2/2",
  className: "button-secondary-54",
};

const toggle17Data = {
  className: "toggle-38",
  buttonSecondaryProps: buttonSecondary17Data,
};

const visualManagement3Data = {
  navItems2Props: navItems26Data,
  navItems3Props: navItems39Data,
  toggleProps: toggle17Data,
};

const frame1133211Data = {
  className: "frame-113-10",
};

const navItems223Data = {
  className: "nav-items-2-21",
  frame11332Props: frame1133211Data,
};

const frame114212Data = {
  className: "frame-114-100",
};

const frame1132226Data = {
  className: "frame-113-34",
};

const pricing35Data = {
  cost: "Cost",
};

const pricing36Data = {
  cost: "Modernization",
  className: "pricing-8-1",
};

const pricing37Data = {
  cost: "Social",
  className: "pricing-5-1",
};

const pricing38Data = {
  cost: "Client/Consumer",
  className: "pricing-7-1",
};

const curPerformancesData = {
  label1: "Existing case",
  label2: "Reference case",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  place1: "Back",
  place2: "Quality",
  inputType1: "text",
  inputPlaceholder1: "      /25",
  line211: "/img/line-21@2x.png",
  leadTime: "Lead Time",
  inputType2: "text",
  inputPlaceholder2: "      /25",
  line212: "/img/line-21-5@2x.png",
  environment: "Environment",
  inputType3: "text",
  inputPlaceholder3: "      /25",
  line213: "/img/line-21-5@2x.png",
  propositions: "Propositions",
  navItems22Props: navItems223Data,
  frame1142Props: frame114212Data,
  frame11322Props: frame1132226Data,
  pricing31Props: pricing35Data,
  pricing32Props: pricing36Data,
  pricing33Props: pricing37Data,
  pricing34Props: pricing38Data,
};

const frame942Data = {
  className: "frame-94-1",
};

const frame952Data = {
  className: "frame-95-1",
};

const inscriptionData = {
  aerialViewContainerCargoShipSea1:
    "/img/aerial-view-container-cargo-ship-sea-1.png",
  subtract: "/img/subtract.png",
  polygon1: "/img/polygon-1-1@2x.png",
  polygon2: "/img/polygon-2@2x.png",
  login: "Sign in",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---20081@2x.png",
  polygon3: "/img/polygon-3@2x.png",
  frame94Props: frame942Data,
  frame95Props: frame952Data,
};

const frame1172219Data = {
  children: "Existing Case",
};

const frame1162220Data = {
  children: "Reference Cases",
};

const frame1132227Data = {
  className: "",
};

const navItems310Data = {
  className: "nav-items-3-10",
  frame1172Props: frame1172219Data,
  frame1162Props: frame1162220Data,
  frame1132Props: frame1132227Data,
};

const buttonSecondary18Data = {
  children: "After-sales service and dispute resolution 1",
  className: "",
};

const toggle18Data = {
  className: "toggle-39",
  buttonSecondaryProps: buttonSecondary18Data,
};

const ouinon7Data = {
  yes: "Yes",
  place: "No",
};

const frame1367Data = {
  ouinonProps: ouinon7Data,
};

const ouinon8Data = {
  yes: "Yes",
  place: "No",
};

const frame1368Data = {
  ouinonProps: ouinon8Data,
};

const ouinon9Data = {
  yes: "Yes",
  place: "No",
};

const frame1369Data = {
  ouinonProps: ouinon9Data,
};

const ouinon10Data = {
  yes: "Yes",
  place: "No",
};

const frame13610Data = {
  ouinonProps: ouinon10Data,
};

const buttonSecondary19Data = {
  children: "After-sales service and dispute resolution 2",
  className: "button-secondary-56",
};

const toggle19Data = {
  className: "toggle-40",
  buttonSecondaryProps: buttonSecondary19Data,
};

const ouinon11Data = {
  yes: "Yes",
  place: "No",
};

const frame13611Data = {
  ouinonProps: ouinon11Data,
};

const ouinon12Data = {
  yes: "Yes",
  place: "No",
};

const frame13612Data = {
  ouinonProps: ouinon12Data,
};

const ouinon13Data = {
  yes: "Yes",
  place: "No",
};

const frame13613Data = {
  ouinonProps: ouinon13Data,
};

const ouinon14Data = {
  yes: "Yes",
  place: "No",
};

const frame13614Data = {
  ouinonProps: ouinon14Data,
};

const buttonSecondary20Data = {
  children: "2/2",
  className: "button-secondary-57",
};

const toggle20Data = {
  className: "toggle-41",
  buttonSecondaryProps: buttonSecondary20Data,
};

const clientConsommateur2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType8: "text",
  inputPlaceholder8: "De quel type de chauffage sont équipés vos bâtiments?",
  next: "Next",
  navItems3Props: navItems310Data,
  toggle1Props: toggle18Data,
  frame1361Props: frame1367Data,
  frame1362Props: frame1368Data,
  frame1363Props: frame1369Data,
  frame1364Props: frame13610Data,
  toggle2Props: toggle19Data,
  frame1365Props: frame13611Data,
  frame1366Props: frame13612Data,
  frame1367Props: frame13613Data,
  frame1368Props: frame13614Data,
  toggle3Props: toggle20Data,
};

const frame1172220Data = {
  children: "Existing Case",
};

const frame1162221Data = {
  children: "Reference Cases",
};

const frame1132228Data = {
  className: "frame-113-36",
};

const navItems311Data = {
  className: "nav-items-3-11",
  frame1172Props: frame1172220Data,
  frame1162Props: frame1162221Data,
  frame1132Props: frame1132228Data,
};

const frame11311Data = {
  className: "frame-113-47",
};

const frame11719Data = {
  className: "frame-117-89",
};

const buttonSecondary21Data = {
  children: "Emploi/Relation Employeur- employé 1",
  className: "",
};

const toggle21Data = {
  className: "toggle",
  buttonSecondaryProps: buttonSecondary21Data,
};

const ouinon15Data = {
  yes: "Yes",
  place: "No",
};

const frame13615Data = {
  ouinonProps: ouinon15Data,
};

const ouinon16Data = {
  yes: "Yes",
  place: "No",
};

const frame13616Data = {
  ouinonProps: ouinon16Data,
};

const ouinon17Data = {
  yes: "Yes",
  place: "No",
};

const frame13617Data = {
  ouinonProps: ouinon17Data,
};

const buttonSecondary22Data = {
  children: "Emploi/Relation Employeur- employé 2",
  className: "",
};

const toggle22Data = {
  className: "toggle",
  buttonSecondaryProps: buttonSecondary22Data,
};

const ouinon18Data = {
  yes: "Yes",
  place: "No",
};

const frame13618Data = {
  ouinonProps: ouinon18Data,
};

const ouinon19Data = {
  yes: "Yes",
  place: "No",
};

const frame13619Data = {
  className: "frame-153",
  ouinonProps: ouinon19Data,
};

const frame1331Data = {
  frame136Props: frame13619Data,
};

const frame1441Data = {
  frame133Props: frame1331Data,
};

const ouinon20Data = {
  yes: "Yes",
  place: "No",
};

const frame13620Data = {
  ouinonProps: ouinon20Data,
};

const ouinon21Data = {
  yes: "Yes",
  place: "No",
};

const frame13621Data = {
  ouinonProps: ouinon21Data,
};

const buttonSecondary23Data = {
  children: "1/6",
  className: "button-secondary-58",
};

const toggle23Data = {
  className: "toggle-42",
  buttonSecondaryProps: buttonSecondary23Data,
};

const social1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1-43@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems311Data,
  frame113Props: frame11311Data,
  frame117Props: frame11719Data,
  toggle1Props: toggle21Data,
  frame1361Props: frame13615Data,
  frame1362Props: frame13616Data,
  frame1363Props: frame13617Data,
  toggle2Props: toggle22Data,
  frame1364Props: frame13618Data,
  frame144Props: frame1441Data,
  frame1365Props: frame13620Data,
  frame1366Props: frame13621Data,
  toggle3Props: toggle23Data,
};

const navItems28Data = {
  className: "nav-items-2-9",
};

const frame1172221Data = {
  children: "Existing Case",
};

const frame1162222Data = {
  children: "Reference Cases",
};

const frame1132229Data = {
  className: "",
};

const navItems312Data = {
  className: "nav-items-3-12",
  frame1172Props: frame1172221Data,
  frame1162Props: frame1162222Data,
  frame1132Props: frame1132229Data,
};

const buttonSecondary24Data = {
  children: "Artificial Intellignece (AI) 1",
  className: "",
};

const toggle24Data = {
  className: "toggle-1",
  buttonSecondaryProps: buttonSecondary24Data,
};

const ouinon22Data = {
  yes: "Yes",
  place: "No",
};

const frame13622Data = {
  ouinonProps: ouinon22Data,
};

const ouinon23Data = {
  yes: "Yes",
  place: "No",
};

const frame13623Data = {
  ouinonProps: ouinon23Data,
};

const ouinon24Data = {
  yes: "Yes",
  place: "No",
};

const frame13624Data = {
  ouinonProps: ouinon24Data,
};

const ouinon25Data = {
  yes: "Yes",
  place: "No",
};

const frame13625Data = {
  ouinonProps: ouinon25Data,
};

const buttonSecondary25Data = {
  children: "Artificial Intellignece (AI) 2",
  className: "",
};

const toggle25Data = {
  className: "toggle-1",
  buttonSecondaryProps: buttonSecondary25Data,
};

const ouinon26Data = {
  yes: "Yes",
  place: "No",
};

const frame13626Data = {
  ouinonProps: ouinon26Data,
};

const ouinon27Data = {
  yes: "Yes",
  place: "No",
};

const frame13627Data = {
  className: "frame-153-1",
  ouinonProps: ouinon27Data,
};

const frame1332Data = {
  frame136Props: frame13627Data,
};

const frame1442Data = {
  frame133Props: frame1332Data,
};

const ouinon28Data = {
  yes: "Yes",
  place: "No",
};

const frame13628Data = {
  ouinonProps: ouinon28Data,
};

const buttonSecondary26Data = {
  children: "1/4",
  className: "button-secondary-59",
};

const toggle26Data = {
  className: "toggle-43",
  buttonSecondaryProps: buttonSecondary26Data,
};

const modernization1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems2Props: navItems28Data,
  navItems3Props: navItems312Data,
  toggle1Props: toggle24Data,
  frame1361Props: frame13622Data,
  frame1362Props: frame13623Data,
  frame1363Props: frame13624Data,
  frame1364Props: frame13625Data,
  toggle2Props: toggle25Data,
  frame1365Props: frame13626Data,
  frame144Props: frame1442Data,
  frame1366Props: frame13628Data,
  toggle3Props: toggle26Data,
};

const frame1172222Data = {
  children: "Existing Case",
};

const frame1162223Data = {
  children: "Reference Cases",
};

const frame1132230Data = {
  className: "",
};

const navItems313Data = {
  className: "nav-items-3-13",
  frame1172Props: frame1172222Data,
  frame1162Props: frame1162223Data,
  frame1132Props: frame1132230Data,
};

const buttonSecondary27Data = {
  children: (
    <React.Fragment>
      Fair information and contract practices
      <br />
      and contracts
    </React.Fragment>
  ),
  className: "button-secondary-60",
};

const toggle27Data = {
  className: "toggle-44",
  buttonSecondaryProps: buttonSecondary27Data,
};

const ouinon29Data = {
  yes: "Yes",
  place: "No",
};

const frame13629Data = {
  ouinonProps: ouinon29Data,
};

const ouinon30Data = {
  yes: "Yes",
  place: "No",
};

const frame13630Data = {
  ouinonProps: ouinon30Data,
};

const ouinon31Data = {
  yes: "Yes",
  place: "No",
};

const frame13631Data = {
  ouinonProps: ouinon31Data,
};

const buttonSecondary28Data = {
  children: "Protection of the health and safety of customers/consumers",
  className: "button-secondary-61",
};

const toggle28Data = {
  className: "toggle-45",
  buttonSecondaryProps: buttonSecondary28Data,
};

const ouinon32Data = {
  yes: "Yes",
  place: "No",
};

const frame13632Data = {
  ouinonProps: ouinon32Data,
};

const ouinon33Data = {
  yes: "Yes",
  place: "No",
};

const frame13633Data = {
  ouinonProps: ouinon33Data,
};

const ouinon34Data = {
  yes: "Yes",
  place: "No",
};

const frame13634Data = {
  ouinonProps: ouinon34Data,
};

const buttonSecondary29Data = {
  children: (
    <React.Fragment>
      Customer / consumer data protection
      <br />
      consumers
    </React.Fragment>
  ),
  className: "button-secondary-62",
};

const toggle29Data = {
  className: "toggle-46",
  buttonSecondaryProps: buttonSecondary29Data,
};

const ouinon35Data = {
  yes: "Yes",
  place: "No",
};

const frame13635Data = {
  ouinonProps: ouinon35Data,
};

const ouinon36Data = {
  yes: "Yes",
  place: "No",
};

const frame13636Data = {
  className: "frame-153-2",
  ouinonProps: ouinon36Data,
};

const frame1333Data = {
  frame136Props: frame13636Data,
};

const frame1443Data = {
  frame133Props: frame1333Data,
};

const ouinon37Data = {
  yes: "Yes",
  place: "No",
};

const frame13637Data = {
  ouinonProps: ouinon37Data,
};

const buttonSecondary30Data = {
  children: "1/2",
  className: "button-secondary-63",
};

const toggle30Data = {
  className: "toggle-47",
  buttonSecondaryProps: buttonSecondary30Data,
};

const clientConsommateur1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems313Data,
  toggle1Props: toggle27Data,
  frame1361Props: frame13629Data,
  frame1362Props: frame13630Data,
  frame1363Props: frame13631Data,
  toggle2Props: toggle28Data,
  frame1364Props: frame13632Data,
  frame1365Props: frame13633Data,
  frame1366Props: frame13634Data,
  toggle3Props: toggle29Data,
  frame1367Props: frame13635Data,
  frame144Props: frame1443Data,
  frame1368Props: frame13637Data,
  toggle4Props: toggle30Data,
};

const frame1172223Data = {
  children: "Existing Case",
};

const frame1162224Data = {
  children: "Reference Cases",
};

const frame1132231Data = {
  className: "",
};

const navItems314Data = {
  className: "nav-items-3-14",
  frame1172Props: frame1172223Data,
  frame1162Props: frame1162224Data,
  frame1132Props: frame1132231Data,
};

const buttonSecondary31Data = {
  children: "Procurement 1",
  className: "",
};

const toggle31Data = {
  className: "toggle-48",
  buttonSecondaryProps: buttonSecondary31Data,
};

const frame422Data = {
  className: "",
};

const frame432Data = {
  className: "",
};

const ouinon210Data = {
  frame42Props: frame422Data,
  frame43Props: frame432Data,
};

const frame423Data = {
  className: "",
};

const frame433Data = {
  className: "",
};

const ouinon211Data = {
  className: "ouinon-49",
  frame42Props: frame423Data,
  frame43Props: frame433Data,
};

const buttonSecondary32Data = {
  children: "Procurement 2",
  className: "",
};

const toggle32Data = {
  className: "toggle-49",
  buttonSecondaryProps: buttonSecondary32Data,
};

const frame424Data = {
  className: "frame-4-53-1",
};

const frame434Data = {
  className: "frame-4-61-1",
};

const ouinon212Data = {
  className: "ouinon-46",
  frame42Props: frame424Data,
  frame43Props: frame434Data,
};

const frame425Data = {
  className: "frame-4-53",
};

const frame435Data = {
  className: "frame-4-61",
};

const ouinon213Data = {
  className: "ouinon-46",
  frame42Props: frame425Data,
  frame43Props: frame435Data,
};

const buttonSecondary33Data = {
  children: "Procurement 3",
  className: "",
};

const toggle33Data = {
  className: "toggle-50",
  buttonSecondaryProps: buttonSecondary33Data,
};

const ouinon38Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-22-1",
};

const ouinon39Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-22-2",
};

const ouinon40Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-22-3",
};

const ouinon41Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-22",
};

const buttonSecondary34Data = {
  children: "1/2",
  className: "button-secondary-64",
};

const toggle34Data = {
  className: "toggle-51",
  buttonSecondaryProps: buttonSecondary34Data,
};

const leadTime1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems314Data,
  toggle1Props: toggle31Data,
  ouinon21Props: ouinon210Data,
  ouinon22Props: ouinon211Data,
  toggle2Props: toggle32Data,
  ouinon23Props: ouinon212Data,
  ouinon24Props: ouinon213Data,
  toggle3Props: toggle33Data,
  ouinon1Props: ouinon38Data,
  ouinon2Props: ouinon39Data,
  ouinon3Props: ouinon40Data,
  ouinon4Props: ouinon41Data,
  toggle4Props: toggle34Data,
};

const navItems211Data = {
  className: "nav-items-2-12",
};

const frame1172224Data = {
  children: "Existing Case",
};

const frame1162225Data = {
  children: "Reference Cases",
};

const frame1132232Data = {
  className: "",
};

const navItems315Data = {
  className: "nav-items-3-15",
  frame1172Props: frame1172224Data,
  frame1162Props: frame1162225Data,
  frame1132Props: frame1132232Data,
};

const buttonSecondary35Data = {
  children: "Stock  1",
  className: "",
};

const toggle35Data = {
  className: "toggle-52",
  buttonSecondaryProps: buttonSecondary35Data,
};

const ouinon42Data = {
  yes: "Yes",
  place: "No",
};

const frame13638Data = {
  ouinonProps: ouinon42Data,
};

const ouinon43Data = {
  yes: "Yes",
  place: "No",
};

const frame13639Data = {
  ouinonProps: ouinon43Data,
};

const ouinon44Data = {
  yes: "Yes",
  place: "No",
};

const frame13640Data = {
  ouinonProps: ouinon44Data,
};

const ouinon45Data = {
  yes: "Yes",
  place: "No",
};

const frame13641Data = {
  ouinonProps: ouinon45Data,
};

const buttonSecondary36Data = {
  children: "Stock 2",
  className: "",
};

const toggle36Data = {
  className: "toggle-53",
  buttonSecondaryProps: buttonSecondary36Data,
};

const ouinon46Data = {
  yes: "Yes",
  place: "No",
};

const frame13642Data = {
  ouinonProps: ouinon46Data,
};

const ouinon47Data = {
  yes: "Yes",
  place: "No",
};

const frame13643Data = {
  ouinonProps: ouinon47Data,
};

const ouinon48Data = {
  yes: "Yes",
  place: "No",
};

const frame13644Data = {
  ouinonProps: ouinon48Data,
};

const ouinon49Data = {
  yes: "Yes",
  place: "No",
};

const frame13645Data = {
  ouinonProps: ouinon49Data,
};

const buttonSecondary37Data = {
  children: "Market",
  className: "",
};

const toggle37Data = {
  className: "toggle-54",
  buttonSecondaryProps: buttonSecondary37Data,
};

const ouinon50Data = {
  yes: "Yes",
  place: "No",
};

const frame13646Data = {
  ouinonProps: ouinon50Data,
};

const ouinon51Data = {
  yes: "Yes",
  place: "No",
};

const frame13647Data = {
  className: "frame-153-3",
  ouinonProps: ouinon51Data,
};

const frame1334Data = {
  frame136Props: frame13647Data,
};

const frame1444Data = {
  frame133Props: frame1334Data,
};

const ouinon52Data = {
  yes: "Yes",
  place: "No",
};

const frame13648Data = {
  ouinonProps: ouinon52Data,
};

const ouinon53Data = {
  yes: "Yes",
  place: "No",
};

const frame13649Data = {
  ouinonProps: ouinon53Data,
};

const ouinon54Data = {
  yes: "Yes",
  place: "No",
};

const frame13650Data = {
  ouinonProps: ouinon54Data,
};

const buttonSecondary38Data = {
  children: "1/2",
  className: "button-secondary-65",
};

const toggle38Data = {
  className: "toggle-55",
  buttonSecondaryProps: buttonSecondary38Data,
};

const cost1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType8: "text",
  inputPlaceholder8: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType9: "text",
  inputPlaceholder9: "Connaissez vous votre bilan carbone?",
  inputType10: "text",
  inputPlaceholder10: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType11: "text",
  inputPlaceholder11: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType12: "text",
  inputPlaceholder12: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType13: "text",
  inputPlaceholder13: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems2Props: navItems211Data,
  navItems3Props: navItems315Data,
  toggle1Props: toggle35Data,
  frame1361Props: frame13638Data,
  frame1362Props: frame13639Data,
  frame1363Props: frame13640Data,
  frame1364Props: frame13641Data,
  toggle2Props: toggle36Data,
  frame1365Props: frame13642Data,
  frame1366Props: frame13643Data,
  frame1367Props: frame13644Data,
  frame1368Props: frame13645Data,
  toggle3Props: toggle37Data,
  frame1369Props: frame13646Data,
  frame144Props: frame1444Data,
  frame13610Props: frame13648Data,
  frame13611Props: frame13649Data,
  frame13612Props: frame13650Data,
  toggle4Props: toggle38Data,
};

const navItems212Data = {
  className: "nav-items-2-13",
};

const frame1172225Data = {
  children: "Existing Case",
};

const frame1162226Data = {
  children: "Reference Cases",
};

const frame1132233Data = {
  className: "",
};

const navItems316Data = {
  className: "nav-items-3-16",
  frame1172Props: frame1172225Data,
  frame1162Props: frame1162226Data,
  frame1132Props: frame1132233Data,
};

const buttonSecondary39Data = {
  children: "Customer Requirements 1",
  className: "",
};

const toggle39Data = {
  className: "toggle-56",
  buttonSecondaryProps: buttonSecondary39Data,
};

const ouinon55Data = {
  yes: "Yes",
  place: "No",
};

const frame13651Data = {
  ouinonProps: ouinon55Data,
};

const ouinon56Data = {
  yes: "Yes",
  place: "No",
};

const frame13652Data = {
  ouinonProps: ouinon56Data,
};

const ouinon57Data = {
  yes: "Yes",
  place: "No",
};

const frame13653Data = {
  ouinonProps: ouinon57Data,
};

const buttonSecondary40Data = {
  children: "Customer Requirements 2",
  className: "",
};

const toggle40Data = {
  className: "toggle-57",
  buttonSecondaryProps: buttonSecondary40Data,
};

const ouinon58Data = {
  yes: "Yes",
  place: "No",
};

const frame13654Data = {
  ouinonProps: ouinon58Data,
};

const ouinon59Data = {
  yes: "Yes",
  place: "No",
};

const frame13655Data = {
  ouinonProps: ouinon59Data,
};

const ouinon60Data = {
  yes: "Yes",
  place: "No",
};

const frame13656Data = {
  ouinonProps: ouinon60Data,
};

const buttonSecondary41Data = {
  children: "Customer Requirements 3",
  className: "",
};

const toggle41Data = {
  className: "toggle-58",
  buttonSecondaryProps: buttonSecondary41Data,
};

const ouinon61Data = {
  yes: "Yes",
  place: "No",
};

const frame13657Data = {
  ouinonProps: ouinon61Data,
};

const ouinon62Data = {
  yes: "Yes",
  place: "No",
};

const frame13658Data = {
  className: "frame-153-4",
  ouinonProps: ouinon62Data,
};

const frame1335Data = {
  frame136Props: frame13658Data,
};

const frame1445Data = {
  frame133Props: frame1335Data,
};

const ouinon63Data = {
  yes: "Yes",
  place: "No",
};

const frame13659Data = {
  ouinonProps: ouinon63Data,
};

const buttonSecondary42Data = {
  children: "1/7",
  className: "button-secondary-66",
};

const toggle42Data = {
  className: "toggle-59",
  buttonSecondaryProps: buttonSecondary42Data,
};

const quality1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems2Props: navItems212Data,
  navItems3Props: navItems316Data,
  toggle1Props: toggle39Data,
  frame1361Props: frame13651Data,
  frame1362Props: frame13652Data,
  frame1363Props: frame13653Data,
  toggle2Props: toggle40Data,
  frame1364Props: frame13654Data,
  frame1365Props: frame13655Data,
  frame1366Props: frame13656Data,
  toggle3Props: toggle41Data,
  frame1367Props: frame13657Data,
  frame144Props: frame1445Data,
  frame1368Props: frame13659Data,
  toggle4Props: toggle42Data,
};

const frame1172226Data = {
  children: "Existing Case",
};

const frame1162227Data = {
  children: "Reference Cases",
};

const frame1132234Data = {
  className: "",
};

const navItems317Data = {
  className: "nav-items-3-17",
  frame1172Props: frame1172226Data,
  frame1162Props: frame1162227Data,
  frame1132Props: frame1132234Data,
};

const buttonSecondary43Data = {
  children: "External Providers 1",
  className: "",
};

const toggle43Data = {
  className: "toggle-28",
  buttonSecondaryProps: buttonSecondary43Data,
};

const ouinon64Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-1",
};

const ouinon65Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-2",
};

const ouinon66Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-3",
};

const buttonSecondary44Data = {
  children: "External Providers 2",
  className: "",
};

const toggle44Data = {
  className: "toggle-28",
  buttonSecondaryProps: buttonSecondary44Data,
};

const ouinon67Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-4",
};

const ouinon68Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-29",
};

const buttonSecondary45Data = {
  children: "Process Approach",
  className: "",
};

const toggle45Data = {
  className: "toggle-60",
  buttonSecondaryProps: buttonSecondary45Data,
};

const ouinon69Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-5",
};

const ouinon70Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-6",
};

const ouinon71Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24-7",
};

const ouinon72Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-24",
};

const frame1111Data = {
  toggle1Props: toggle43Data,
  ouinon1Props: ouinon64Data,
  ouinon2Props: ouinon65Data,
  ouinon3Props: ouinon66Data,
  toggle2Props: toggle44Data,
  ouinon4Props: ouinon67Data,
  ouinon5Props: ouinon68Data,
  toggle3Props: toggle45Data,
  ouinon6Props: ouinon69Data,
  ouinon7Props: ouinon70Data,
  ouinon8Props: ouinon71Data,
  ouinon9Props: ouinon72Data,
};

const buttonSecondary46Data = {
  children: "7/7",
  className: "button-secondary-67",
};

const toggle46Data = {
  className: "toggle-61",
  buttonSecondaryProps: buttonSecondary46Data,
};



const frame1172227Data = {
  children: "Existing Case",
};

const frame1162228Data = {
  children: "Reference Cases",
};

const frame1132235Data = {
  className: "",
};

const navItems318Data = {
  className: "nav-items-3-18",
  frame1172Props: frame1172227Data,
  frame1162Props: frame1162228Data,
  frame1132Props: frame1132235Data,
};

const buttonSecondary47Data = {
  children: "Pollution de l'eau et des Sols",
  className: "",
};

const toggle47Data = {
  className: "toggle-2",
  buttonSecondaryProps: buttonSecondary47Data,
};

const ouinon73Data = {
  yes: "Yes",
  place: "No",
};

const frame13660Data = {
  className: "frame-136",
  ouinonProps: ouinon73Data,
};

const frame1336Data = {
  className: "frame-133-2",
  frame136Props: frame13660Data,
};

const ouinon74Data = {
  yes: "Yes",
  place: "No",
};

const frame13661Data = {
  className: "frame-130",
  ouinonProps: ouinon74Data,
};

const ouinon75Data = {
  yes: "Yes",
  place: "No",
};

const frame13662Data = {
  className: "frame-133",
  ouinonProps: ouinon75Data,
};

const ouinon76Data = {
  yes: "Yes",
  place: "No",
};

const frame13663Data = {
  className: "frame-134",
  ouinonProps: ouinon76Data,
};

const ouinon77Data = {
  yes: "Yes",
  place: "No",
};

const frame13664Data = {
  className: "frame-133-1",
  ouinonProps: ouinon77Data,
};

const buttonSecondary48Data = {
  children: "Pollution de l'air",
  className: "",
};

const toggle48Data = {
  className: "toggle-2",
  buttonSecondaryProps: buttonSecondary48Data,
};

const ouinon78Data = {
  yes: "Yes",
  place: "No",
};

const frame13665Data = {
  className: "frame-130-1",
  ouinonProps: ouinon78Data,
};

const ouinon79Data = {
  yes: "Yes",
  place: "No",
};

const frame13666Data = {
  className: "frame-130-2",
  ouinonProps: ouinon79Data,
};

const ouinon80Data = {
  yes: "Yes",
  place: "No",
};

const frame13667Data = {
  className: "frame-130-3",
  ouinonProps: ouinon80Data,
};

const ouinon81Data = {
  yes: "Yes",
  place: "No",
};

const frame13668Data = {
  className: "frame-131",
  ouinonProps: ouinon81Data,
};

const ouinon82Data = {
  yes: "Yes",
  place: "No",
};

const frame13669Data = {
  className: "frame-132",
  ouinonProps: ouinon82Data,
};

const buttonSecondary49Data = {
  children: "2/5",
  className: "button-secondary-68",
};

const toggle49Data = {
  className: "x25",
  buttonSecondaryProps: buttonSecondary49Data,
};

const environmental2Data = {
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType8: "text",
  inputPlaceholder8: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType10: "text",
  inputPlaceholder10: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType11: "text",
  inputPlaceholder11: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems318Data,
  toggle1Props: toggle47Data,
  frame133Props: frame1336Data,
  frame1361Props: frame13661Data,
  frame1362Props: frame13662Data,
  frame1363Props: frame13663Data,
  frame1364Props: frame13664Data,
  toggle2Props: toggle48Data,
  frame1365Props: frame13665Data,
  frame1366Props: frame13666Data,
  frame1367Props: frame13667Data,
  frame1368Props: frame13668Data,
  frame1369Props: frame13669Data,
  toggle3Props: toggle49Data,
};

const frame1172228Data = {
  children: "Existing Case",
};

const frame1162229Data = {
  children: "Reference Cases",
};

const frame1132236Data = {
  className: "",
};

const navItems319Data = {
  className: "nav-items-3-19",
  frame1172Props: frame1172228Data,
  frame1162Props: frame1162229Data,
  frame1132Props: frame1132236Data,
};

const buttonSecondary50Data = {
  children: "Energie",
  className: "",
};

const toggle50Data = {
  className: "toggle-62",
  buttonSecondaryProps: buttonSecondary50Data,
};

const ouinon83Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-30",
};

const ouinon84Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-20",
};

const ouinon85Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-20",
};

const buttonSecondary51Data = {
  children: "Biodiversité",
  className: "",
};

const toggle51Data = {
  className: "toggle-63",
  buttonSecondaryProps: buttonSecondary51Data,
};

const ouinon86Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-21",
};

const ouinon87Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-31",
};

const ouinon88Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-21",
};

const buttonSecondary52Data = {
  children: "3/5",
  className: "button-secondary-69",
};

const toggle52Data = {
  className: "toggle-64",
  buttonSecondaryProps: buttonSecondary52Data,
};

const environmental3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems319Data,
  toggle1Props: toggle50Data,
  ouinon1Props: ouinon83Data,
  ouinon2Props: ouinon84Data,
  ouinon3Props: ouinon85Data,
  toggle2Props: toggle51Data,
  ouinon4Props: ouinon86Data,
  ouinon5Props: ouinon87Data,
  ouinon6Props: ouinon88Data,
  toggle3Props: toggle52Data,
};

const frame1172229Data = {
  children: "Existing Case",
};

const frame1162230Data = {
  children: "Reference Cases",
};

const frame1132237Data = {
  className: "",
};

const navItems320Data = {
  className: "nav-items-3-20",
  frame1172Props: frame1172229Data,
  frame1162Props: frame1162230Data,
  frame1132Props: frame1132237Data,
};

const buttonSecondary53Data = {
  children: "Emploi/Relation Employeur- employé 3",
  className: "",
};

const toggle53Data = {
  className: "toggle-65",
  buttonSecondaryProps: buttonSecondary53Data,
};

const ouinon89Data = {
  yes: "Yes",
  place: "No",
};

const frame13670Data = {
  ouinonProps: ouinon89Data,
};

const ouinon90Data = {
  yes: "Yes",
  place: "No",
};

const frame13671Data = {
  ouinonProps: ouinon90Data,
};

const ouinon91Data = {
  yes: "Yes",
  place: "No",
};

const frame13672Data = {
  ouinonProps: ouinon91Data,
};

const buttonSecondary54Data = {
  children: "2/6",
  className: "button-secondary-71",
};

const toggle54Data = {
  className: "toggle-66",
  buttonSecondaryProps: buttonSecondary54Data,
};

const social2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems320Data,
  toggle1Props: toggle53Data,
  frame1361Props: frame13670Data,
  frame1362Props: frame13671Data,
  frame1363Props: frame13672Data,
  toggle2Props: toggle54Data,
};

const frame1172230Data = {
  children: "Existing Case",
};

const frame1162231Data = {
  children: "Reference Cases",
};

const frame1132238Data = {
  className: "",
};

const navItems321Data = {
  className: "nav-items-3-21",
  frame1172Props: frame1172230Data,
  frame1162Props: frame1162231Data,
  frame1132Props: frame1132238Data,
};

const buttonSecondary55Data = {
  children: "Big data and cloud computing 1",
  className: "",
};

const toggle55Data = {
  className: "toggle-3",
  buttonSecondaryProps: buttonSecondary55Data,
};

const ouinon92Data = {
  yes: "Yes",
  place: "No",
};

const frame13673Data = {
  ouinonProps: ouinon92Data,
};

const ouinon93Data = {
  yes: "Yes",
  place: "No",
};

const frame13674Data = {
  ouinonProps: ouinon93Data,
};

const ouinon94Data = {
  yes: "Yes",
  place: "No",
};

const frame13675Data = {
  ouinonProps: ouinon94Data,
};

const buttonSecondary56Data = {
  children: "Big data and cloud computing 2",
  className: "",
};

const toggle56Data = {
  className: "toggle-3",
  buttonSecondaryProps: buttonSecondary56Data,
};

const ouinon95Data = {
  yes: "Yes",
  place: "No",
};

const frame13676Data = {
  ouinonProps: ouinon95Data,
};

const ouinon96Data = {
  yes: "Yes",
  place: "No",
};

const frame13677Data = {
  className: "frame-153-5",
  ouinonProps: ouinon96Data,
};

const frame1337Data = {
  frame136Props: frame13677Data,
};

const frame1446Data = {
  frame133Props: frame1337Data,
};

const ouinon97Data = {
  yes: "Yes",
  place: "No",
};

const frame13678Data = {
  ouinonProps: ouinon97Data,
};

const ouinon98Data = {
  yes: "Yes",
  place: "No",
};

const frame13679Data = {
  ouinonProps: ouinon98Data,
};

const buttonSecondary57Data = {
  children: "2/4",
  className: "button-secondary-72",
};

const toggle57Data = {
  className: "toggle-67",
  buttonSecondaryProps: buttonSecondary57Data,
};

const modernization2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  next: "Next",
  navItems3Props: navItems321Data,
  toggle1Props: toggle55Data,
  frame1361Props: frame13673Data,
  frame1362Props: frame13674Data,
  frame1363Props: frame13675Data,
  toggle2Props: toggle56Data,
  frame1364Props: frame13676Data,
  frame144Props: frame1446Data,
  frame1365Props: frame13678Data,
  frame1366Props: frame13679Data,
  toggle3Props: toggle57Data,
};

const frame1172231Data = {
  children: "Existing Case",
};

const frame1162232Data = {
  children: "Reference Cases",
};

const frame1132239Data = {
  className: "",
};

const navItems322Data = {
  className: "nav-items-3-22",
  frame1172Props: frame1172231Data,
  frame1162Props: frame1162232Data,
  frame1132Props: frame1132239Data,
};

const buttonSecondary58Data = {
  children: "Resources",
  className: "",
};

const toggle58Data = {
  className: "toggle-68",
  buttonSecondaryProps: buttonSecondary58Data,
};

const ouinon99Data = {
  yes: "Yes",
  place: "No",
};

const frame13680Data = {
  ouinonProps: ouinon99Data,
};

const ouinon100Data = {
  yes: "Yes",
  place: "No",
};

const frame13681Data = {
  ouinonProps: ouinon100Data,
};

const ouinon101Data = {
  yes: "Yes",
  place: "No",
};

const frame13682Data = {
  ouinonProps: ouinon101Data,
};

const ouinon102Data = {
  yes: "Yes",
  place: "No",
};

const frame13683Data = {
  ouinonProps: ouinon102Data,
};

const ouinon103Data = {
  yes: "Yes",
  place: "No",
};

const frame13684Data = {
  ouinonProps: ouinon103Data,
};

const buttonSecondary59Data = {
  children: "Product 1",
  className: "",
};

const toggle59Data = {
  className: "toggle-69",
  buttonSecondaryProps: buttonSecondary59Data,
};

const ouinon104Data = {
  yes: "Yes",
  place: "No",
};

const frame13685Data = {
  ouinonProps: ouinon104Data,
};

const ouinon105Data = {
  yes: "Yes",
  place: "No",
};

const frame13686Data = {
  ouinonProps: ouinon105Data,
};

const ouinon106Data = {
  yes: "Yes",
  place: "No",
};

const frame13687Data = {
  ouinonProps: ouinon106Data,
};

const ouinon107Data = {
  yes: "Yes",
  place: "No",
};

const frame13688Data = {
  ouinonProps: ouinon107Data,
};

const buttonSecondary60Data = {
  children: "2/2",
  className: "button-secondary-73",
};

const toggle60Data = {
  className: "toggle-70",
  buttonSecondaryProps: buttonSecondary60Data,
};

const cost2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType8: "text",
  inputPlaceholder8: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  qualityCriteria: "Quality  criteria",
  navItems3Props: navItems322Data,
  toggle1Props: toggle58Data,
  frame1361Props: frame13680Data,
  frame1362Props: frame13681Data,
  frame1363Props: frame13682Data,
  frame1364Props: frame13683Data,
  frame1365Props: frame13684Data,
  toggle2Props: toggle59Data,
  frame1366Props: frame13685Data,
  frame1367Props: frame13686Data,
  frame1368Props: frame13687Data,
  frame1369Props: frame13688Data,
  toggle3Props: toggle60Data,
};

const frame1172232Data = {
  children: "Existing Case",
};

const frame1162233Data = {
  children: "Reference Cases",
};

const frame1132240Data = {
  className: "",
};

const navItems323Data = {
  className: "nav-items-3-23",
  frame1172Props: frame1172232Data,
  frame1162Props: frame1162233Data,
  frame1132Props: frame1132240Data,
};

const buttonSecondary61Data = {
  children: "Manufacturing",
  className: "",
};

const toggle61Data = {
  className: "toggle-71",
  buttonSecondaryProps: buttonSecondary61Data,
};

const ouinon108Data = {
  yes: "Yes",
  place: "No",
};

const frame13689Data = {
  ouinonProps: ouinon108Data,
};

const ouinon109Data = {
  yes: "Yes",
  place: "No",
};

const frame13690Data = {
  ouinonProps: ouinon109Data,
};

const ouinon110Data = {
  yes: "Yes",
  place: "No",
};

const frame13691Data = {
  ouinonProps: ouinon110Data,
};

const buttonSecondary62Data = {
  children: "Storage",
  className: "",
};

const toggle62Data = {
  className: "toggle-72",
  buttonSecondaryProps: buttonSecondary62Data,
};

const ouinon111Data = {
  yes: "Yes",
  place: "No",
};

const frame13692Data = {
  ouinonProps: ouinon111Data,
};

const ouinon112Data = {
  yes: "Yes",
  place: "No",
};

const frame13693Data = {
  ouinonProps: ouinon112Data,
};

const ouinon113Data = {
  yes: "Yes",
  place: "No",
};

const frame13694Data = {
  ouinonProps: ouinon113Data,
};

const buttonSecondary63Data = {
  children: "Delivery",
  className: "",
};

const toggle63Data = {
  className: "toggle-73",
  buttonSecondaryProps: buttonSecondary63Data,
};

const ouinon114Data = {
  yes: "Yes",
  place: "No",
};

const frame13695Data = {
  ouinonProps: ouinon114Data,
};

const ouinon115Data = {
  yes: "Yes",
  place: "No",
};

const frame13696Data = {
  className: "frame-153-6",
  ouinonProps: ouinon115Data,
};

const frame1338Data = {
  frame136Props: frame13696Data,
};

const frame1447Data = {
  frame133Props: frame1338Data,
};

const ouinon116Data = {
  yes: "Yes",
  place: "No",
};

const frame13697Data = {
  ouinonProps: ouinon116Data,
};

const ouinon117Data = {
  yes: "Yes",
  place: "No",
};

const frame13698Data = {
  className: "frame-146",
  ouinonProps: ouinon117Data,
};

const buttonSecondary64Data = {
  children: "2/2",
  className: "button-secondary-74",
};

const toggle64Data = {
  className: "toggle-74",
  buttonSecondaryProps: buttonSecondary64Data,
};

const leadTime2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType10: "text",
  inputPlaceholder10: "De quel type de chauffage sont équipés vos bâtiments?",
  costCriteria: "Cost criteria",
  navItems3Props: navItems323Data,
  toggle1Props: toggle61Data,
  frame1361Props: frame13689Data,
  frame1362Props: frame13690Data,
  frame1363Props: frame13691Data,
  toggle2Props: toggle62Data,
  frame1364Props: frame13692Data,
  frame1365Props: frame13693Data,
  frame1366Props: frame13694Data,
  toggle3Props: toggle63Data,
  frame1367Props: frame13695Data,
  frame144Props: frame1447Data,
  frame1368Props: frame13697Data,
  frame1369Props: frame13698Data,
  toggle4Props: toggle64Data,
};

const frame1172233Data = {
  children: "Existing Case",
};

const frame1162234Data = {
  children: "Reference Cases",
};

const frame1132241Data = {
  className: "",
};

const navItems324Data = {
  className: "nav-items-3-24",
  frame1172Props: frame1172233Data,
  frame1162Props: frame1162234Data,
  frame1132Props: frame1132241Data,
};

const buttonSecondary65Data = {
  children: "Traceability",
  className: "",
};

const toggle65Data = {
  className: "toggle-75",
  buttonSecondaryProps: buttonSecondary65Data,
};

const ouinon118Data = {
  yes: "Yes",
  place: "No",
};

const frame13699Data = {
  ouinonProps: ouinon118Data,
};

const ouinon119Data = {
  yes: "Yes",
  place: "No",
};

const frame136100Data = {
  ouinonProps: ouinon119Data,
};

const ouinon120Data = {
  yes: "Yes",
  place: "No",
};

const frame136101Data = {
  ouinonProps: ouinon120Data,
};

const ouinon121Data = {
  yes: "Yes",
  place: "No",
};

const frame136102Data = {
  ouinonProps: ouinon121Data,
};

const buttonSecondary66Data = {
  children: "Improvement 1",
  className: "",
};

const toggle66Data = {
  className: "toggle-76",
  buttonSecondaryProps: buttonSecondary66Data,
};

const ouinon122Data = {
  yes: "Yes",
  place: "No",
};

const frame136103Data = {
  ouinonProps: ouinon122Data,
};

const ouinon123Data = {
  yes: "Yes",
  place: "No",
};

const frame136104Data = {
  ouinonProps: ouinon123Data,
};

const ouinon124Data = {
  yes: "Yes",
  place: "No",
};

const frame136105Data = {
  ouinonProps: ouinon124Data,
};

const ouinon125Data = {
  yes: "Yes",
  place: "No",
};

const frame136106Data = {
  ouinonProps: ouinon125Data,
};

const buttonSecondary67Data = {
  children: "Improvement 2",
  className: "button-secondary-75",
};

const toggle67Data = {
  className: "toggle-77",
  buttonSecondaryProps: buttonSecondary67Data,
};

const ouinon126Data = {
  yes: "Yes",
  place: "No",
};

const frame136107Data = {
  ouinonProps: ouinon126Data,
};

const ouinon127Data = {
  yes: "Yes",
  place: "No",
};

const frame136108Data = {
  ouinonProps: ouinon127Data,
};

const ouinon128Data = {
  yes: "Yes",
  place: "No",
};

const frame136109Data = {
  ouinonProps: ouinon128Data,
};

const buttonSecondary68Data = {
  children: "6/7",
  className: "button-secondary-76",
};

const toggle68Data = {
  className: "toggle-78",
  buttonSecondaryProps: buttonSecondary68Data,
};

const quality6Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType8: "text",
  inputPlaceholder8: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType10: "text",
  inputPlaceholder10: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType11: "text",
  inputPlaceholder11: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems324Data,
  toggle1Props: toggle65Data,
  frame1361Props: frame13699Data,
  frame1362Props: frame136100Data,
  frame1363Props: frame136101Data,
  frame1364Props: frame136102Data,
  toggle2Props: toggle66Data,
  frame1365Props: frame136103Data,
  frame1366Props: frame136104Data,
  frame1367Props: frame136105Data,
  frame1368Props: frame136106Data,
  toggle3Props: toggle67Data,
  frame1369Props: frame136107Data,
  frame13610Props: frame136108Data,
  frame13611Props: frame136109Data,
  toggle4Props: toggle68Data,
};

const navItems221Data = {
  className: "nav-items-2-22",
};

const frame1172234Data = {
  children: "Existing Case",
};

const frame1162235Data = {
  children: "Reference Cases",
};

const frame1132242Data = {
  className: "",
};

const navItems325Data = {
  className: "nav-items-3-25",
  frame1172Props: frame1172234Data,
  frame1162Props: frame1162235Data,
  frame1132Props: frame1132242Data,
};

const buttonSecondary69Data = {
  children: "2/2",
  className: "button-secondary-77",
};

const toggle69Data = {
  className: "toggle-79",
  buttonSecondaryProps: buttonSecondary69Data,
};

const informationalModel3Data = {
  navItems2Props: navItems221Data,
  navItems3Props: navItems325Data,
  toggleProps: toggle69Data,
};

const frame1172235Data = {
  children: "Existing Case",
};

const frame1162236Data = {
  children: "Reference Cases",
};

const frame1132243Data = {
  className: "",
};

const navItems326Data = {
  className: "nav-items-3-26",
  frame1172Props: frame1172235Data,
  frame1162Props: frame1162236Data,
  frame1132Props: frame1132243Data,
};

const buttonSecondary70Data = {
  children: "1/2",
  className: "button-secondary-31",
};

const toggle70Data = {
  className: "toggle-80",
  buttonSecondaryProps: buttonSecondary70Data,
};

const buttonSecondary71Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-31",
};

const toggle71Data = {
  className: "toggle-11",
  buttonSecondaryProps: buttonSecondary71Data,
};

const group10241Data = {
  line24: "/img/line-24-80.png",
};

const group10242Data = {
  line24: "/img/line-24-81.png",
};

const group10243Data = {
  line24: "/img/line-24-42.png",
};

const group10244Data = {
  line24: "/img/line-24-83.png",
};

const group10245Data = {
  line24: "/img/line-24-84.png",
};

const buttonSecondary72Data = {
  children: "Career evolution",
  className: "button-secondary-31",
};

const toggle72Data = {
  className: "toggle-11",
  buttonSecondaryProps: buttonSecondary72Data,
};

const group10246Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10247Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10248Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group10249Data = {
  line24: "/img/line-24-8.png",
  className: "",
};

const group10250Data = {
  line24: "/img/line-24-9.png",
  className: "",
};

const frame971Data = {
  toggleProps: toggle72Data,
  group1021Props: group10246Data,
  group1022Props: group10247Data,
  group1023Props: group10248Data,
  group1024Props: group10249Data,
  group1025Props: group10250Data,
};

const frame1173216Data = {
  className: "frame-113-49",
};

const informationalModel2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1:
    "Vos employés sont-ils force de propositions concernant les innovations?",
  inputType2: "text",
  inputPlaceholder2:
    "Avez vous un management qui favorise l créativité des salariés?",
  inputType3: "text",
  inputPlaceholder3:
    "Garantissez vous l’égalité des chances de tous les travailleurs? Comment?",
  inputType4: "text",
  inputPlaceholder4: "Quel management utilisez vous?",
  inputType5: "text",
  inputPlaceholder5:
    "Est-ce que les journées de travail sont adaptées au volume de travail?",
  navItems3Props: navItems326Data,
  toggle1Props: toggle70Data,
  toggle2Props: toggle71Data,
  group1021Props: group10241Data,
  group1022Props: group10242Data,
  group1023Props: group10243Data,
  group1024Props: group10244Data,
  group1025Props: group10245Data,
  frame97Props: frame971Data,
  frame11732Props: frame1173216Data,
};

const navItems225Data = {
  className: "nav-items-2-24",
};

const frame1172236Data = {
  children: "Existing Case",
};

const frame1162237Data = {
  children: "Reference Cases",
};

const frame1132244Data = {
  className: "",
};

const navItems327Data = {
  className: "nav-items-3-27",
  frame1172Props: frame1172236Data,
  frame1162Props: frame1162237Data,
  frame1132Props: frame1132244Data,
};

const buttonSecondary73Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-32",
};

const toggle73Data = {
  className: "toggle-12",
  buttonSecondaryProps: buttonSecondary73Data,
};

const group10251Data = {
  line24: "/img/line-24-80.png",
};

const group10252Data = {
  line24: "/img/line-24-81.png",
};

const group10253Data = {
  line24: "/img/line-24-82.png",
  className: "",
};

const group10254Data = {
  line24: "/img/line-24-83.png",
  className: "",
};

const group10255Data = {
  line24: "/img/line-24-84.png",
  className: "",
};

const frame961Data = {
  toggleProps: toggle73Data,
  group1021Props: group10251Data,
  group1022Props: group10252Data,
  group1023Props: group10253Data,
  group1024Props: group10254Data,
  group1025Props: group10255Data,
};

const buttonSecondary74Data = {
  children: "Career evolution",
  className: "button-secondary-32",
};

const toggle74Data = {
  className: "toggle-12",
  buttonSecondaryProps: buttonSecondary74Data,
};

const group10256Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10257Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10258Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group10259Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group10260Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame972Data = {
  className: "frame-97-5",
  toggleProps: toggle74Data,
  group1021Props: group10256Data,
  group1022Props: group10257Data,
  group1023Props: group10258Data,
  group1024Props: group10259Data,
  group1025Props: group10260Data,
};

const frame1173217Data = {
  className: "frame-113-50",
};

const buttonSecondary75Data = {
  children: "1/2",
  className: "button-secondary-32",
};

const toggle75Data = {
  className: "toggle-81",
  buttonSecondaryProps: buttonSecondary75Data,
};

const processView2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems225Data,
  navItems3Props: navItems327Data,
  frame96Props: frame961Data,
  frame97Props: frame972Data,
  frame11732Props: frame1173217Data,
  toggleProps: toggle75Data,
};

const frame1172237Data = {
  children: "Existing Case",
};

const frame1162238Data = {
  children: "Reference Cases",
};

const frame1132245Data = {
  className: "",
};

const navItems328Data = {
  className: "nav-items-3-28",
  frame1172Props: frame1172237Data,
  frame1162Props: frame1162238Data,
  frame1132Props: frame1132245Data,
};

const buttonSecondary76Data = {
  children: "Customer Satisfaction 1",
  className: "",
};

const toggle76Data = {
  className: "toggle-82",
  buttonSecondaryProps: buttonSecondary76Data,
};

const ouinon129Data = {
  yes: "Yes",
  place: "No",
};

const frame136110Data = {
  ouinonProps: ouinon129Data,
};

const ouinon130Data = {
  yes: "Yes",
  place: "No",
};

const frame136111Data = {
  ouinonProps: ouinon130Data,
};

const ouinon131Data = {
  yes: "Yes",
  place: "No",
};

const frame136112Data = {
  ouinonProps: ouinon131Data,
};

const buttonSecondary77Data = {
  children: "Customer Satisfaction 2",
  className: "",
};

const toggle77Data = {
  className: "toggle-83",
  buttonSecondaryProps: buttonSecondary77Data,
};

const ouinon132Data = {
  yes: "Yes",
  place: "No",
};

const frame136113Data = {
  ouinonProps: ouinon132Data,
};

const ouinon133Data = {
  yes: "Yes",
  place: "No",
};

const frame136114Data = {
  ouinonProps: ouinon133Data,
};

const ouinon134Data = {
  yes: "Yes",
  place: "No",
};

const frame136115Data = {
  ouinonProps: ouinon134Data,
};

const buttonSecondary78Data = {
  children: "Communication with employees",
  className: "button-secondary-78",
};

const toggle78Data = {
  className: "toggle-84",
  buttonSecondaryProps: buttonSecondary78Data,
};

const ouinon135Data = {
  yes: "Yes",
  place: "No",
};

const frame136116Data = {
  ouinonProps: ouinon135Data,
};

const buttonSecondary79Data = {
  children: "2/7",
  className: "button-secondary-79",
};

const toggle79Data = {
  className: "toggle-85",
  buttonSecondaryProps: buttonSecondary79Data,
};

const quality2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems328Data,
  toggle1Props: toggle76Data,
  frame1361Props: frame136110Data,
  frame1362Props: frame136111Data,
  frame1363Props: frame136112Data,
  toggle2Props: toggle77Data,
  frame1364Props: frame136113Data,
  frame1365Props: frame136114Data,
  frame1366Props: frame136115Data,
  toggle3Props: toggle78Data,
  frame1367Props: frame136116Data,
  toggle4Props: toggle79Data,
};

const navItems227Data = {
  className: "nav-items-2-26",
};

const frame1172238Data = {
  children: "Existing Case",
};

const frame1162239Data = {
  children: "Reference Cases",
};

const frame1132246Data = {
  className: "",
};

const navItems329Data = {
  className: "nav-items-3-29",
  frame1172Props: frame1172238Data,
  frame1162Props: frame1162239Data,
  frame1132Props: frame1132246Data,
};

const buttonSecondary80Data = {
  children: "2/2",
  className: "button-secondary-80",
};

const toggle80Data = {
  className: "toggle-86",
  buttonSecondaryProps: buttonSecondary80Data,
};

const processView3Data = {
  navItems2Props: navItems227Data,
  navItems3Props: navItems329Data,
  toggleProps: toggle80Data,
};

const navItems228Data = {
  className: "nav-items-2-27",
};

const frame1172239Data = {
  children: "Existing Case",
};

const frame1162240Data = {
  children: "Reference Cases",
};

const frame1132247Data = {
  className: "",
};

const navItems330Data = {
  className: "nav-items-3-30",
  frame1172Props: frame1172239Data,
  frame1162Props: frame1162240Data,
  frame1132Props: frame1132247Data,
};

const frame1173219Data = {
  className: "frame-113-52",
};

const buttonSecondary81Data = {
  children: "1/2",
  className: "button-secondary-33",
};

const toggle81Data = {
  className: "toggle-87",
  buttonSecondaryProps: buttonSecondary81Data,
};

const buttonSecondary82Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-33",
};

const toggle82Data = {
  className: "toggle-13",
  buttonSecondaryProps: buttonSecondary82Data,
};

const group10261Data = {
  line24: "/img/line-24-80.png",
};

const group10262Data = {
  line24: "/img/line-24-81.png",
};

const group10263Data = {
  line24: "/img/line-24-62.png",
  className: "group-6-2",
};

const group10264Data = {
  line24: "/img/line-24-83.png",
  className: "group-6-3",
};

const group10265Data = {
  line24: "/img/line-24-84.png",
  className: "group-6-4",
};

const frame962Data = {
  className: "frame-94-2",
  toggleProps: toggle82Data,
  group1021Props: group10261Data,
  group1022Props: group10262Data,
  group1023Props: group10263Data,
  group1024Props: group10264Data,
  group1025Props: group10265Data,
};

const buttonSecondary83Data = {
  children: "Career evolution",
  className: "button-secondary-33",
};

const toggle83Data = {
  className: "toggle-13",
  buttonSecondaryProps: buttonSecondary83Data,
};

const group10266Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10267Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10268Data = {
  line24: "/img/line-24-7.png",
  className: "group-6-5",
};

const group10269Data = {
  line24: "/img/line-24-18.png",
  className: "group-6-6",
};

const group10270Data = {
  line24: "/img/line-24-19.png",
  className: "group-6",
};

const frame973Data = {
  className: "frame-95-4",
  toggleProps: toggle83Data,
  group1021Props: group10266Data,
  group1022Props: group10267Data,
  group1023Props: group10268Data,
  group1024Props: group10269Data,
  group1025Props: group10270Data,
};

const decisionalView2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems228Data,
  navItems3Props: navItems330Data,
  frame11732Props: frame1173219Data,
  toggleProps: toggle81Data,
  frame96Props: frame962Data,
  frame97Props: frame973Data,
};

const navItems229Data = {
  className: "nav-items-2-28",
};

const frame1172240Data = {
  children: "Existing Case",
};

const frame1162241Data = {
  children: "Reference Cases",
};

const frame1132248Data = {
  className: "",
};

const navItems331Data = {
  className: "nav-items-3-31",
  frame1172Props: frame1172240Data,
  frame1162Props: frame1162241Data,
  frame1132Props: frame1132248Data,
};

const buttonSecondary84Data = {
  children: "1/2",
  className: "button-secondary-34",
};

const toggle84Data = {
  className: "toggle-88",
  buttonSecondaryProps: buttonSecondary84Data,
};

const buttonSecondary85Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-34",
};

const toggle85Data = {
  className: "toggle-14",
  buttonSecondaryProps: buttonSecondary85Data,
};

const group10271Data = {
  line24: "/img/line-24-80.png",
  className: "group-7-1",
};

const group10272Data = {
  line24: "/img/line-24-81.png",
  className: "group-7-2",
};

const group10273Data = {
  line24: "/img/line-24-42.png",
  className: "group-7-3",
};

const group10274Data = {
  line24: "/img/line-24-83.png",
  className: "group-7-4",
};

const group10275Data = {
  line24: "/img/line-24-84.png",
  className: "group-7-5",
};

const frame921Data = {
  toggleProps: toggle85Data,
  group1021Props: group10271Data,
  group1022Props: group10272Data,
  group1023Props: group10273Data,
  group1024Props: group10274Data,
  group1025Props: group10275Data,
};

const frame1173220Data = {
  className: "frame-113-53",
};

const buttonSecondary86Data = {
  children: "Career evolution",
  className: "button-secondary-34",
};

const toggle86Data = {
  className: "toggle-14",
  buttonSecondaryProps: buttonSecondary86Data,
};

const group10276Data = {
  line24: "/img/line-24-5.png",
  className: "group-7-6",
};

const group10277Data = {
  line24: "/img/line-24-6.png",
  className: "group-7-7",
};

const group10278Data = {
  line24: "/img/line-24-7.png",
  className: "group-7-8",
};

const group10279Data = {
  line24: "/img/line-24-18.png",
  className: "group-7-9",
};

const group10280Data = {
  line24: "/img/line-24-19.png",
  className: "group-7",
};

const frame974Data = {
  className: "frame-93",
  toggleProps: toggle86Data,
  group1021Props: group10276Data,
  group1022Props: group10277Data,
  group1023Props: group10278Data,
  group1024Props: group10279Data,
  group1025Props: group10280Data,
};

const physicalModel2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems229Data,
  navItems3Props: navItems331Data,
  toggleProps: toggle84Data,
  frame92Props: frame921Data,
  frame11732Props: frame1173220Data,
  frame97Props: frame974Data,
};

const navItems230Data = {
  className: "nav-items-2-29",
};

const frame1172241Data = {
  children: "Existing Case",
};

const frame1162242Data = {
  children: "Reference Cases",
};

const frame1132249Data = {
  className: "",
};

const navItems332Data = {
  className: "nav-items-3-32",
  frame1172Props: frame1172241Data,
  frame1162Props: frame1162242Data,
  frame1132Props: frame1132249Data,
};

const buttonSecondary87Data = {
  children: "2/2",
  className: "button-secondary-35",
};

const toggle87Data = {
  className: "toggle-89",
  buttonSecondaryProps: buttonSecondary87Data,
};

const buttonSecondary88Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-35",
};

const toggle88Data = {
  className: "toggle-15",
  buttonSecondaryProps: buttonSecondary88Data,
};

const group10281Data = {
  line24: "/img/line-24-80.png",
  className: "group-8-1",
};

const group10282Data = {
  line24: "/img/line-24-81.png",
  className: "group-8-2",
};

const group10283Data = {
  line24: "/img/line-24-62.png",
  className: "group-8-3",
};

const group10284Data = {
  line24: "/img/line-24-83.png",
  className: "group-8-4",
};

const group10285Data = {
  line24: "/img/line-24-84.png",
  className: "group-8-5",
};

const frame922Data = {
  className: "frame-92-1",
  toggleProps: toggle88Data,
  group1021Props: group10281Data,
  group1022Props: group10282Data,
  group1023Props: group10283Data,
  group1024Props: group10284Data,
  group1025Props: group10285Data,
};

const buttonSecondary89Data = {
  children: "Career evolution",
  className: "button-secondary-35",
};

const toggle89Data = {
  className: "toggle-15",
  buttonSecondaryProps: buttonSecondary89Data,
};

const group10286Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group10287Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group10288Data = {
  line24: "/img/line-24-7.png",
  className: "group-8-6",
};

const group10289Data = {
  line24: "/img/line-24-18.png",
  className: "group-8-7",
};

const group10290Data = {
  line24: "/img/line-24-19.png",
  className: "group-8",
};

const frame931Data = {
  toggleProps: toggle89Data,
  group1021Props: group10286Data,
  group1022Props: group10287Data,
  group1023Props: group10288Data,
  group1024Props: group10289Data,
  group1025Props: group10290Data,
};

const decisionalView3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  procesView: "Proces view",
  navItems2Props: navItems230Data,
  navItems3Props: navItems332Data,
  toggleProps: toggle87Data,
  frame92Props: frame922Data,
  frame93Props: frame931Data,
};

const frame1172242Data = {
  children: "Existing Case",
};

const frame1162243Data = {
  children: "Reference Cases",
};

const frame1132250Data = {
  className: "",
};

const navItems333Data = {
  className: "nav-items-3-33",
  frame1172Props: frame1172242Data,
  frame1162Props: frame1162243Data,
  frame1132Props: frame1132250Data,
};

const buttonSecondary90Data = {
  children: "Internal Audit 1",
  className: "",
};

const toggle90Data = {
  className: "toggle-29",
  buttonSecondaryProps: buttonSecondary90Data,
};

const ouinon136Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28-1",
};

const ouinon137Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28-2",
};

const ouinon138Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28-3",
};

const buttonSecondary91Data = {
  children: "Internal Audit 2",
  className: "",
};

const toggle91Data = {
  className: "toggle-29",
  buttonSecondaryProps: buttonSecondary91Data,
};

const ouinon139Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28-4",
};

const ouinon140Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28-5",
};

const ouinon141Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-28",
};

const buttonSecondary92Data = {
  children: "5/7",
  className: "button-secondary-81",
};

const toggle92Data = {
  className: "toggle-90",
  buttonSecondaryProps: buttonSecondary92Data,
};

const quality5Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre bilan carbone?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems333Data,
  toggle1Props: toggle90Data,
  ouinon1Props: ouinon136Data,
  ouinon2Props: ouinon137Data,
  ouinon3Props: ouinon138Data,
  toggle2Props: toggle91Data,
  ouinon4Props: ouinon139Data,
  ouinon5Props: ouinon140Data,
  ouinon6Props: ouinon141Data,
  toggle3Props: toggle92Data,
};

const navItems232Data = {
  className: "nav-items-2-31",
};

const frame1172243Data = {
  children: "Existing Case",
};

const frame1162244Data = {
  children: "Reference Cases",
};

const frame1132251Data = {
  className: "",
};

const navItems334Data = {
  className: "nav-items-3-34",
  frame1172Props: frame1172243Data,
  frame1162Props: frame1162244Data,
  frame1132Props: frame1132251Data,
};

const buttonSecondary93Data = {
  children: "2/2",
  className: "button-secondary-36",
};

const toggle93Data = {
  className: "toggle-91",
  buttonSecondaryProps: buttonSecondary93Data,
};

const buttonSecondary94Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-36",
};

const toggle94Data = {
  className: "toggle-16",
  buttonSecondaryProps: buttonSecondary94Data,
};

const group10291Data = {
  line24: "/img/line-24-80.png",
  className: "group-10-1",
};

const group10292Data = {
  line24: "/img/line-24-81.png",
  className: "group-10-2",
};

const group10293Data = {
  line24: "/img/line-24-42.png",
  className: "group-10-3",
};

const group10294Data = {
  line24: "/img/line-24-83.png",
  className: "group-10-4",
};

const group10295Data = {
  line24: "/img/line-24-84.png",
  className: "group-10-5",
};

const frame923Data = {
  className: "frame-85",
  toggleProps: toggle94Data,
  group1021Props: group10291Data,
  group1022Props: group10292Data,
  group1023Props: group10293Data,
  group1024Props: group10294Data,
  group1025Props: group10295Data,
};

const buttonSecondary95Data = {
  children: "Career evolution",
  className: "button-secondary-36",
};

const toggle95Data = {
  className: "toggle-16",
  buttonSecondaryProps: buttonSecondary95Data,
};

const group10296Data = {
  line24: "/img/line-24-5.png",
  className: "group-10-6",
};

const group10297Data = {
  line24: "/img/line-24-6.png",
  className: "group-10-7",
};

const group10298Data = {
  line24: "/img/line-24-7.png",
  className: "group-10-8",
};

const group10299Data = {
  line24: "/img/line-24-18.png",
  className: "group-10-9",
};

const group102100Data = {
  line24: "/img/line-24-19.png",
  className: "group-10",
};

const frame932Data = {
  className: "frame-86",
  toggleProps: toggle95Data,
  group1021Props: group10296Data,
  group1022Props: group10297Data,
  group1023Props: group10298Data,
  group1024Props: group10299Data,
  group1025Props: group102100Data,
};

const physicalModel3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  decisionalView: "Decisional View",
  navItems2Props: navItems232Data,
  navItems3Props: navItems334Data,
  toggleProps: toggle93Data,
  frame92Props: frame923Data,
  frame93Props: frame932Data,
};

const navItems233Data = {
  className: "nav-items-2-32",
};

const frame1172244Data = {
  children: "Existing Case",
};

const frame1162245Data = {
  children: "Reference Cases",
};

const frame1132252Data = {
  className: "",
};

const navItems335Data = {
  className: "nav-items-3-35",
  frame1172Props: frame1172244Data,
  frame1162Props: frame1162245Data,
  frame1132Props: frame1132252Data,
};

const buttonSecondary96Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-37",
};

const toggle96Data = {
  className: "toggle-17",
  buttonSecondaryProps: buttonSecondary96Data,
};

const group102101Data = {
  line24: "/img/line-24-80.png",
  className: "group-11-1",
};

const group102102Data = {
  line24: "/img/line-24-81.png",
  className: "group-11-2",
};

const group102103Data = {
  line24: "/img/line-24-62.png",
  className: "",
};

const group102104Data = {
  line24: "/img/line-24-83.png",
  className: "",
};

const group102105Data = {
  line24: "/img/line-24-84.png",
  className: "",
};

const frame9222Data = {
  toggleProps: toggle96Data,
  group1021Props: group102101Data,
  group1022Props: group102102Data,
  group1023Props: group102103Data,
  group1024Props: group102104Data,
  group1025Props: group102105Data,
};

const buttonSecondary97Data = {
  children: "Career evolution",
  className: "button-secondary-37",
};

const toggle97Data = {
  className: "toggle-17",
  buttonSecondaryProps: buttonSecondary97Data,
};

const group102106Data = {
  line24: "/img/line-24-5.png",
  className: "group-11-3",
};

const group102107Data = {
  line24: "/img/line-24-6.png",
  className: "group-11-4",
};

const group102108Data = {
  line24: "/img/line-24-7.png",
  className: "group-11",
};

const group102109Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group102110Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame933Data = {
  className: "frame-93-2",
  toggleProps: toggle97Data,
  group1021Props: group102106Data,
  group1022Props: group102107Data,
  group1023Props: group102108Data,
  group1024Props: group102109Data,
  group1025Props: group102110Data,
};

const buttonSecondary98Data = {
  children: "1/3",
  className: "button-secondary-37",
};

const toggle98Data = {
  className: "toggle-92",
  buttonSecondaryProps: buttonSecondary98Data,
};

const functionnalView2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems233Data,
  navItems3Props: navItems335Data,
  frame922Props: frame9222Data,
  frame93Props: frame933Data,
  toggleProps: toggle98Data,
};

const navItems234Data = {
  className: "nav-items-2-33",
};

const frame1172245Data = {
  children: "Existing Case",
};

const frame1162246Data = {
  children: "Reference Cases",
};

const frame1132253Data = {
  className: "",
};

const navItems336Data = {
  className: "nav-items-3-36",
  frame1172Props: frame1172245Data,
  frame1162Props: frame1162246Data,
  frame1132Props: frame1132253Data,
};

const buttonSecondary99Data = {
  children: "Strength of proposal and employee autonomy",
  className: "button-secondary-38",
};

const toggle99Data = {
  className: "toggle-18",
  buttonSecondaryProps: buttonSecondary99Data,
};

const group102111Data = {
  line24: "/img/line-24-80.png",
  className: "group-12-1",
};

const group102112Data = {
  line24: "/img/line-24-81.png",
  className: "group-12-2",
};

const group102113Data = {
  line24: "/img/line-24-82.png",
  className: "group-12-3",
};

const group102114Data = {
  line24: "/img/line-24-83.png",
  className: "group-12-4",
};

const group102115Data = {
  line24: "/img/line-24-84.png",
  className: "group-12-5",
};

const frame9223Data = {
  className: "frame-85-1",
  toggleProps: toggle99Data,
  group1021Props: group102111Data,
  group1022Props: group102112Data,
  group1023Props: group102113Data,
  group1024Props: group102114Data,
  group1025Props: group102115Data,
};

const buttonSecondary100Data = {
  children: "Career evolution",
  className: "button-secondary-38",
};

const toggle100Data = {
  className: "toggle-18",
  buttonSecondaryProps: buttonSecondary100Data,
};

const group102116Data = {
  line24: "/img/line-24-5.png",
  className: "group-12-6",
};

const group102117Data = {
  line24: "/img/line-24-6.png",
  className: "group-12",
};

const group102118Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group102119Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group102120Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame934Data = {
  className: "frame-86-1",
  toggleProps: toggle100Data,
  group1021Props: group102116Data,
  group1022Props: group102117Data,
  group1023Props: group102118Data,
  group1024Props: group102119Data,
  group1025Props: group102120Data,
};

const frame1173223Data = {
  className: "frame-113-56",
};

const buttonSecondary101Data = {
  children: "2/3",
  className: "button-secondary-38",
};

const toggle101Data = {
  className: "toggle-93",
  buttonSecondaryProps: buttonSecondary101Data,
};

const functionnalView3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems234Data,
  navItems3Props: navItems336Data,
  frame922Props: frame9223Data,
  frame93Props: frame934Data,
  frame11732Props: frame1173223Data,
  toggleProps: toggle101Data,
};

const frame1172246Data = {
  children: "Existing Case",
};

const frame1162247Data = {
  children: "Reference Cases",
};

const frame1132254Data = {
  className: "",
};

const navItems337Data = {
  className: "nav-items-3-37",
  frame1172Props: frame1172246Data,
  frame1162Props: frame1162247Data,
  frame1132Props: frame1132254Data,
};

const buttonSecondary102Data = {
  children: "Recycling",
  className: "button-secondary-39",
};

const toggle102Data = {
  className: "toggle-94",
  buttonSecondaryProps: buttonSecondary102Data,
};

const group102121Data = {
  line24: "/img/line-24-120.png",
  className: "group-13-1",
};

const group102122Data = {
  line24: "/img/line-24-121.png",
  className: "group-13",
};

const group102123Data = {
  line24: "/img/line-24-122.png",
};

const group102124Data = {
  line24: "/img/line-24-123.png",
};

const buttonSecondary103Data = {
  children: "3/3",
  className: "button-secondary-39",
};

const toggle103Data = {
  className: "toggle-95",
  buttonSecondaryProps: buttonSecondary103Data,
};

const functionnalView4Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4:
    "En moyenne dans quelle périmètre vous approvisionnez vous?",
  physicalModel: "Physical Model",
  navItems3Props: navItems337Data,
  toggle1Props: toggle102Data,
  group1021Props: group102121Data,
  group1022Props: group102122Data,
  group1023Props: group102123Data,
  group1024Props: group102124Data,
  toggle2Props: toggle103Data,
};

const frame1172247Data = {
  children: "Existing Case",
};

const frame1162248Data = {
  children: "Reference Cases",
};

const frame1132255Data = {
  className: "",
};

const navItems338Data = {
  className: "nav-items-3-38",
  frame1172Props: frame1172247Data,
  frame1162Props: frame1162248Data,
  frame1132Props: frame1132255Data,
};

const frame1121Data = {
  children: "Click here",
};

const loadingPageData = {
  navItems3Props: navItems338Data,
  frame112Props: frame1121Data,
};

const frame11811Data = {
  children: "Visual management",
  className: "frame-113-27",
};

const headerMenuDefault3Data = {
  children: "Requirements",
  className: "menu-item-default-1",
};

const headerMenuDefault4Data = {
  children: (
    <React.Fragment>
      Define,
      <br />
      Prepare,
      <br />
      Document
    </React.Fragment>
  ),
  className: "menu-item-default-2",
};

const headerMenuDefault5Data = {
  children: (
    <React.Fragment>
      Measure, <br />
      Compare
    </React.Fragment>
  ),
  className: "menu-item-default-3",
};

const headerMenuDefault6Data = {
  children: (
    <React.Fragment>
      Evaluate,
      <br />
      Correct
    </React.Fragment>
  ),
  className: "menu-item-default-4",
};

const headerMenuDefault7Data = {
  children: (
    <React.Fragment>
      Execute, <br />
      Code
    </React.Fragment>
  ),
  className: "menu-item-default-5",
};

const headerMenuDefault8Data = {
  children: "Satisfaction",
  className: "menu-item-default-6",
};

const kaizen1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  overlapGroup11: "/img/arrow-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  overlapGroup4: "/img/arrow-2@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line4: "/img/line-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  label2: "Zoom",
  overlapGroup8: "/img/text-format@2x.png",
  textFormat: "/img/text-format@2x.png",
  label3: "Text",
  label4: "Text",
  overlapGroup17: "/img/line-1.png",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  inputType1: "text",
  inputPlaceholder1: "INPUT",
  arrow5: "/img/arrow-5-6@2x.png",
  arrow1: "/img/arrow-1-8@2x.png",
  inputType2: "text",
  inputPlaceholder2: "PLAN",
  arrow3: "/img/arrow-3-7@2x.png",
  arrow7: "/img/arrow-5-6@2x.png",
  inputType3: "text",
  inputPlaceholder3: "ACT",
  inputType4: "text",
  inputPlaceholder4: "DO",
  inputType5: "text",
  inputPlaceholder5: "CHECK",
  arrow4: "/img/arrow-4-7@2x.png",
  arrow6: "/img/arrow-5-6@2x.png",
  modeling: "Modeling",
  arrow2: "/img/arrow-2-8@2x.png",
  arrow8: "/img/arrow-5-6@2x.png",
  xcontinue: "Continue",
  inputType6: "text",
  inputPlaceholder6: "OUTPUT",
  frame118Props: frame11811Data,
  headerMenuDefault1Props: headerMenuDefault3Data,
  headerMenuDefault2Props: headerMenuDefault4Data,
  headerMenuDefault3Props: headerMenuDefault5Data,
  headerMenuDefault4Props: headerMenuDefault6Data,
  headerMenuDefault5Props: headerMenuDefault7Data,
  headerMenuDefault6Props: headerMenuDefault8Data,
};

const frame1172248Data = {
  children: "Existing Case",
};

const frame1162249Data = {
  children: "Reference Cases",
};

const frame1132257Data = {
  className: "",
};

const navItems339Data = {
  className: "nav-items-3-39",
  frame1172Props: frame1172248Data,
  frame1162Props: frame1162249Data,
  frame1132Props: frame1132257Data,
};

const buttonSecondary104Data = {
  children: "Functionnal View",
  className: "button-secondary-82",
};

const toggle104Data = {
  className: "toggle-96",
  buttonSecondaryProps: buttonSecondary104Data,
};

const buttonSecondary105Data = {
  children: "3. Decisional View",
  className: "button-secondary-83",
};

const toggle105Data = {
  className: "toggle-97",
  buttonSecondaryProps: buttonSecondary105Data,
};

const buttonSecondary106Data = {
  children: "2. Physical Model",
  className: "button-secondary-41",
};

const toggle106Data = {
  className: "toggle-31",
  buttonSecondaryProps: buttonSecondary106Data,
};

const buttonSecondary107Data = {
  children: "4. Process view",
  className: "button-secondary-84",
};

const toggle107Data = {
  className: "toggle-98",
  buttonSecondaryProps: buttonSecondary107Data,
};

const buttonSecondary108Data = {
  children: "5. Informational Model",
  className: "button-secondary-40",
};

const toggle108Data = {
  className: "toggle-99",
  buttonSecondaryProps: buttonSecondary108Data,
};

const buttonSecondary109Data = {
  children: "Lean VSM",
  className: "button-secondary-40",
};

const toggle109Data = {
  className: "toggle-100",
  buttonSecondaryProps: buttonSecondary109Data,
};

const buttonSecondary110Data = {
  children: "4. Kaizen",
  className: "button-secondary-40",
};

const toggle110Data = {
  className: "toggle-101",
  buttonSecondaryProps: buttonSecondary110Data,
};

const buttonSecondary111Data = {
  children: "2. 5S",
  className: "button-secondary-40",
};

const toggle111Data = {
  className: "toggle-102",
  buttonSecondaryProps: buttonSecondary111Data,
};

const buttonSecondary112Data = {
  children: "5. SMED",
  className: "button-secondary-40",
};

const toggle112Data = {
  className: "toggle-103",
  buttonSecondaryProps: buttonSecondary112Data,
};

const buttonSecondary113Data = {
  children: "3. Kanban",
  className: "button-secondary-40",
};

const toggle113Data = {
  className: "toggle-104",
  buttonSecondaryProps: buttonSecondary113Data,
};

const buttonSecondary114Data = {
  children: "6. Visual Management",
  className: "button-secondary-41",
};

const toggle114Data = {
  className: "toggle-31",
  buttonSecondaryProps: buttonSecondary114Data,
};

const existingSystemsData = {
  ellipse116: "/img/polygon-3@2x.png",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  existingSystems: "EXISTING SYSTEMS",
  graiMethodologyModels: "GRAI METHODOLOGY MODELS",
  x2SupplementaryModels: "2.   SUPPLEMENTARY MODELS",
  navItems3Props: navItems339Data,
  toggle1Props: toggle104Data,
  toggle2Props: toggle105Data,
  toggle3Props: toggle106Data,
  toggle4Props: toggle107Data,
  toggle5Props: toggle108Data,
  toggle6Props: toggle109Data,
  toggle7Props: toggle110Data,
  toggle8Props: toggle111Data,
  toggle9Props: toggle112Data,
  toggle10Props: toggle113Data,
  toggle11Props: toggle114Data,
};

const frame11354Data = {
  className: "frame-113-54",
};

const frame11812Data = {
  children: "Visual management",
};

const kanban1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  rectangle23: "/img/rectangle-23@2x.png",
  line2: "/img/line-2-14@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format-15@2x.png",
  label2: "Text",
  line22: "/img/line-22.png",
  place1: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  place2: "PLAN",
  arrow11: "/img/arrow-11-6.png",
  line4: "/img/line-4-4.png",
  inputType1: "text",
  inputPlaceholder1: "URGENCE",
  inputType2: "text",
  inputPlaceholder2: "A FAIRE",
  inputType3: "text",
  inputPlaceholder3: "TERMINE",
  inputType4: "text",
  inputPlaceholder4: "EN ATTENTE",
  inputType5: "text",
  inputPlaceholder5: "EN COURS",
  line3: "/img/line-3-5.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  frame1135Props: frame11354Data,
  frame118Props: frame11812Data,
};

const frame11813Data = {
  children: "Visual management",
  className: "frame-113-30",
};

const headerMenuDefault42Data = {
  children: "Analysis",
};

const headerMenuDefault43Data = {
  children: "VSM Futur",
  className: "menu-item-default-24",
};

const headerMenuDefault44Data = {
  children: "Action Plan",
  className: "menu-item-default-25",
};

const headerMenuDefault45Data = {
  children: "Current VSM",
  className: "menu-item-default-23",
};

const headerMenuDefault46Data = {
  children: (
    <React.Fragment>
      Definition de
      <br /> la famille
      <br /> de produits
    </React.Fragment>
  ),
  className: "menu-item-default-26",
};

const leanVSMData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow4: "/img/arrow-4-4@2x.png",
  arrow6: "/img/arrow-4-4@2x.png",
  arrow5: "/img/arrow-5-3@2x.png",
  rectangle7: "/img/rectangle-7-1@2x.png",
  xcontinue: "Continue",
  arrow1: "/img/arrow-1@2x.png",
  arrow2: "/img/arrow-2@2x.png",
  rectangle6: "/img/rectangle-7@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  arrow3: "/img/arrow-3-4@2x.png",
  modeling: "Modeling",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  frame118Props: frame11813Data,
  headerMenuDefault41Props: headerMenuDefault42Data,
  headerMenuDefault42Props: headerMenuDefault43Data,
  headerMenuDefault43Props: headerMenuDefault44Data,
  headerMenuDefault44Props: headerMenuDefault45Data,
  headerMenuDefault45Props: headerMenuDefault46Data,
};

const frame11814Data = {
  children: "Visual management",
  className: "frame-113-31",
};

const sMED1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "FIN D’USINAGE SERIE A",
  arrow5: "/img/arrow-5-6@2x.png",
  label4: "DEBUT D’USINAGE SERIE B",
  arrow15: "/img/arrow-15-1@2x.png",
  arrow12: "/img/arrow-12-2@2x.png",
  arrow13: "/img/arrow-13-1@2x.png",
  dernierePieceBonneSerieA: "DERNIERE PIECE BONNE SERIE A",
  changementOutillage: (
    <React.Fragment>
      CHANGEMENT
      <br /> OUTILLAGE
    </React.Fragment>
  ),
  reglage: "REGLAGE",
  inputType1: "text",
  inputPlaceholder1: "NETTOYAGE",
  arrow18: "/img/arrow-18@2x.png",
  arrow17: "/img/arrow-17@2x.png",
  arrow16: "/img/arrow-16-1@2x.png",
  inputType2: "text",
  inputPlaceholder2: "PREMIERE PIECE BONNE SERIE B",
  arrow14: "/img/arrow-15-1@2x.png",
  arrow11: "/img/arrow-11-5@2x.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  frame118Props: frame11814Data,
};

const frame11815Data = {
  children: "Visual management",
  className: "frame-113-32",
};

const x5SData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow12: "/img/arrow-1@2x.png",
  arrow13: "/img/arrow-2@2x.png",
  line2: "/img/line-2-14@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format-15@2x.png",
  label2: "Text",
  line23: "/img/line-22.png",
  place: "Back",
  seiri: "SEIRI",
  arrow7: "/img/arrow-7-7@2x.png",
  disposal: "DISPOSAL",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  arrow3: "/img/arrow-3-4@2x.png",
  seiton: "SEITON",
  arrow8: "/img/arrow-8-8@2x.png",
  putAway: "PUT AWAY",
  modeling: "Modeling",
  arrow4: "/img/arrow-4-4@2x.png",
  seison: "SEISON",
  arrow9: "/img/arrow-7-7@2x.png",
  clean: "CLEAN",
  arrow6: "/img/arrow-4-4@2x.png",
  seiketsu: "SEIKETSU",
  shitsuke: "SHITSUKE",
  arrow10: "/img/arrow-8-8@2x.png",
  arrow11: "/img/arrow-8-8@2x.png",
  arrow5: "/img/arrow-5-3@2x.png",
  rectangle7: "/img/rectangle-7-1@2x.png",
  standardize: "STANDARDIZE",
  respect: "RESPECT",
  xcontinue: "Continue",
  frame118Props: frame11815Data,
};

const frame1133217Data = {
  className: "frame-113-16",
};

const frame1132262Data = {
  className: "frame-113-70",
};

const frame11816Data = {
  children: "Visual management",
  className: "frame-113-33",
};

const frame81Data = {
  children: (
    <React.Fragment>
      5<br />
      MISE EN ACTION DES CONTRE-MESURES
    </React.Fragment>
  ),
};

const frame821Data = {
  children: (
    <React.Fragment>
      4<br />
      IDENTIFICATION DES CONTRE-MESURES
    </React.Fragment>
  ),
};

const frame91Data = {
  children: (
    <React.Fragment>
      3<br />
      ETUDE DES CAUSES
    </React.Fragment>
  ),
};

const kaizen12Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  label1: "Design",
  leanVsm: "Lean VSM",
  label2: "CONTINUOUS IMPROVEMENT PROCESS",
  overlapGroup8: "/img/arrow-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  overlapGroup5: "/img/arrow-2@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line4: "/img/line-2@2x.png",
  line2: "/img/line-2@2x.png",
  label3: "Zoom",
  label4: "Zoom",
  overlapGroup9: "/img/text-format@2x.png",
  textFormat: "/img/text-format@2x.png",
  label5: "Text",
  label6: "Text",
  overlapGroup4: "/img/line-1.png",
  line1: "/img/line-1.png",
  place: "Back",
  x1IdentificatonDuProblemeATraiter: (
    <React.Fragment>
      1<br />
      IDENTIFICATON DU PROBLEME A TRAITER
    </React.Fragment>
  ),
  x2EtudeDeLaSituation: (
    <React.Fragment>
      2 <br />
      ETUDE DE LA SITUATION
    </React.Fragment>
  ),
  arrow6: "/img/arrow-6-11@2x.png",
  x6AuditDesContreMesures: (
    <React.Fragment>
      6<br />
      AUDIT DES CONTRE-MESURES
    </React.Fragment>
  ),
  arrow16: "/img/arrow-16-5@2x.png",
  arrow13: "/img/arrow-6-11@2x.png",
  arrow14: "/img/arrow-14-5@2x.png",
  arrow15: "/img/arrow-15-2@2x.png",
  arrow17: "/img/arrow-17-1@2x.png",
  x7StandardisationDesBonnesMesures: (
    <React.Fragment>
      7<br />
      STANDARDISATION DES BONNES MESURES
    </React.Fragment>
  ),
  modeling: "Modeling",
  xcontinue: "Continue",
  frame11332Props: frame1133217Data,
  frame11322Props: frame1132262Data,
  frame118Props: frame11816Data,
  frame8Props: frame81Data,
  frame82Props: frame821Data,
  frame9Props: frame91Data,
};

const frame1172249Data = {
  children: "Existing Case",
};

const frame1162250Data = {
  children: "Reference Cases",
};

const frame1132263Data = {
  className: "",
};

const navItems340Data = {
  className: "nav-items-3-40",
  frame1172Props: frame1172249Data,
  frame1162Props: frame1162250Data,
  frame1132Props: frame1132263Data,
};

const buttonSecondary115Data = {
  children: "Staff involvement 1",
  className: "",
};

const toggle115Data = {
  className: "toggle-105",
  buttonSecondaryProps: buttonSecondary115Data,
};

const ouinon142Data = {
  yes: "Yes",
  place: "No",
};

const frame136117Data = {
  ouinonProps: ouinon142Data,
};

const ouinon143Data = {
  yes: "Yes",
  place: "No",
};

const frame136118Data = {
  ouinonProps: ouinon143Data,
};

const ouinon144Data = {
  yes: "Yes",
  place: "No",
};

const frame136119Data = {
  ouinonProps: ouinon144Data,
};

const ouinon145Data = {
  yes: "Yes",
  place: "No",
};

const frame136120Data = {
  ouinonProps: ouinon145Data,
};

const buttonSecondary116Data = {
  children: "Staff involvement 2",
  className: "",
};

const toggle116Data = {
  className: "toggle-106",
  buttonSecondaryProps: buttonSecondary116Data,
};

const ouinon146Data = {
  yes: "Yes",
  place: "No",
};

const frame136121Data = {
  ouinonProps: ouinon146Data,
};

const ouinon147Data = {
  yes: "Yes",
  place: "No",
};

const frame136122Data = {
  ouinonProps: ouinon147Data,
};

const buttonSecondary117Data = {
  children: "4/7",
  className: "button-secondary-85",
};

const toggle117Data = {
  className: "toggle-107",
  buttonSecondaryProps: buttonSecondary117Data,
};

const quality4Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems340Data,
  toggle1Props: toggle115Data,
  frame1361Props: frame136117Data,
  frame1362Props: frame136118Data,
  frame1363Props: frame136119Data,
  frame1364Props: frame136120Data,
  toggle2Props: toggle116Data,
  frame1365Props: frame136121Data,
  frame1366Props: frame136122Data,
  toggle3Props: toggle117Data,
};

const frame11817Data = {
  children: "Visual management",
  className: "frame-113-35",
};

const headerMenuDefault9Data = {
  children: "Requirements",
  className: "menu-item-default-7",
};

const headerMenuDefault10Data = {
  children: (
    <React.Fragment>
      Define,
      <br />
      Prepare,
      <br />
      Document
    </React.Fragment>
  ),
  className: "menu-item-default-8",
};

const headerMenuDefault11Data = {
  children: (
    <React.Fragment>
      Evaluate,
      <br />
      Correct
    </React.Fragment>
  ),
  className: "menu-item-default-9",
};

const headerMenuDefault12Data = {
  children: (
    <React.Fragment>
      Execute, <br />
      Code
    </React.Fragment>
  ),
  className: "menu-item-default-10",
};

const headerMenuDefault13Data = {
  children: (
    <React.Fragment>
      Measure, <br />
      Compare
    </React.Fragment>
  ),
  className: "menu-item-default-11",
};

const headerMenuDefault14Data = {
  children: "Satisfaction",
  className: "menu-item-default-12",
};

const kaizenData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow12: "/img/arrow-1@2x.png",
  arrow13: "/img/arrow-2@2x.png",
  line2: "/img/line-2-14@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format-15@2x.png",
  label2: "Text",
  line23: "/img/line-22.png",
  place1: "Back",
  input: "INPUT",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  arrow5: "/img/arrow-5-6@2x.png",
  arrow1: "/img/arrow-1-8@2x.png",
  place2: "PLAN",
  arrow3: "/img/arrow-3-7@2x.png",
  arrow7: "/img/arrow-5-6@2x.png",
  act: "ACT",
  xdo: "DO",
  arrow4: "/img/arrow-4-7@2x.png",
  arrow6: "/img/arrow-5-6@2x.png",
  check: "CHECK",
  arrow2: "/img/arrow-2-8@2x.png",
  arrow8: "/img/arrow-5-6@2x.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  output: "OUTPUT",
  frame118Props: frame11817Data,
  headerMenuDefault1Props: headerMenuDefault9Data,
  headerMenuDefault2Props: headerMenuDefault10Data,
  headerMenuDefault3Props: headerMenuDefault11Data,
  headerMenuDefault4Props: headerMenuDefault12Data,
  headerMenuDefault5Props: headerMenuDefault13Data,
  headerMenuDefault6Props: headerMenuDefault14Data,
};

const frame11818Data = {
  children: "Visual management",
  className: "frame-113-37",
};

const frame62Data = {
  className: "frame-6-11",
};

const sMEDData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow121: "/img/arrow-1@2x.png",
  arrow131: "/img/arrow-2@2x.png",
  line2: "/img/line-2-14@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format-15@2x.png",
  label2: "Text",
  line23: "/img/line-22.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  label3: "FIN D’USINAGE SERIE A",
  arrow5: "/img/arrow-5-6@2x.png",
  label4: "DEBUT D’USINAGE SERIE B",
  arrow15: "/img/arrow-15-3@2x.png",
  arrow122: "/img/arrow-12-4@2x.png",
  arrow132: "/img/arrow-13-3@2x.png",
  dernierePieceBonneSerieA: "DERNIERE PIECE BONNE SERIE A",
  changementOutillage: (
    <React.Fragment>
      CHANGEMENT
      <br /> OUTILLAGE
    </React.Fragment>
  ),
  reglage: "REGLAGE",
  nettoyage: "NETTOYAGE",
  arrow18: "/img/arrow-18@2x.png",
  arrow17: "/img/arrow-17@2x.png",
  arrow16: "/img/arrow-16-1@2x.png",
  premierePieceBonneSerieB: "PREMIERE PIECE BONNE SERIE B",
  arrow14: "/img/arrow-15-3@2x.png",
  modeling: "Modeling",
  arrow11: "/img/arrow-11-8@2x.png",
  xcontinue: "Continue",
  frame118Props: frame11818Data,
  frame6Props: frame62Data,
};

const frame11364Data = {
  children: "Visual management",
  className: "frame-113-7",
};

const visualManagementData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow9: "/img/arrow-1@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line2: "/img/line-2@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format@2x.png",
  label2: "Text",
  line1: "/img/line-1.png",
  place: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  connaissancesCompetences: (
    <React.Fragment>
      Connaissances
      <br />
      Competences
    </React.Fragment>
  ),
  collaborateursEquipes: (
    <React.Fragment>
      Collaborateurs
      <br />
      Equipes
    </React.Fragment>
  ),
  strategiesProjets: (
    <React.Fragment>
      Strategies
      <br />
      Projets
    </React.Fragment>
  ),
  ideesInformations: (
    <React.Fragment>
      Idees
      <br />
      Informations
    </React.Fragment>
  ),
  tempsPriorites: (
    <React.Fragment>
      Temps <br />
      Priorites
    </React.Fragment>
  ),
  arrow11: "/img/arrow-11-10@2x.png",
  arrow16: "/img/arrow-16-4@2x.png",
  arrow13: "/img/arrow-13@2x.png",
  arrow14: "/img/arrow-14@2x.png",
  mieuxManager: (
    <React.Fragment>
      Mieux
      <br /> Manager
    </React.Fragment>
  ),
  arrow12: "/img/arrow-12@2x.png",
  arrow15: "/img/arrow-15@2x.png",
  problemesDecision: (
    <React.Fragment>
      Problemes
      <br />
      Decision
    </React.Fragment>
  ),
  modeling: "Modeling",
  analyzeTheFuturPerformances: "Analyze the futur performances",
  frame1136Props: frame11364Data,
};

const frame11819Data = {
  children: "Visual management",
  className: "frame-113-38",
};

const kanbanData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  leanVsm: "Lean VSM",
  arrow9: "/img/arrow-1@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  rectangle23: "/img/rectangle-23@2x.png",
  line2: "/img/line-2-14@2x.png",
  label1: "Zoom",
  textFormat: "/img/text-format-15@2x.png",
  label2: "Text",
  line22: "/img/line-22.png",
  place1: "Back",
  clickOnModeling: "CLICK ON “MODELING” BUTTON TO CREATE YOUR DIAGRAM",
  place2: "PLAN",
  arrow11: "/img/arrow-11-12.png",
  line4: "/img/line-4-4.png",
  urgence: "URGENCE",
  aFaire: "A FAIRE",
  termine: "TERMINE",
  enAttente: "EN ATTENTE",
  enCours: "EN COURS",
  line3: "/img/line-3-5.png",
  modeling: "Modeling",
  xcontinue: "Continue",
  frame118Props: frame11819Data,
};

const navItems239Data = {
  className: "nav-items-2-38",
};

const frame1172250Data = {
  children: "Existing Case",
};

const frame1162251Data = {
  children: "Reference Cases",
};

const frame1132268Data = {
  className: "",
};

const navItems341Data = {
  className: "nav-items-3-41",
  frame1172Props: frame1172250Data,
  frame1162Props: frame1162251Data,
  frame1132Props: frame1132268Data,
};

const buttonSecondary118Data = {
  children: "1/2",
  className: "button-secondary-42",
};

const toggle118Data = {
  className: "toggle-108",
  buttonSecondaryProps: buttonSecondary118Data,
};

const buttonSecondary119Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-42",
};

const toggle119Data = {
  className: "toggle-19",
  buttonSecondaryProps: buttonSecondary119Data,
};

const group102125Data = {
  line24: "/img/line-24.png",
  className: "",
};

const group102126Data = {
  line24: "/img/line-24-1.png",
  className: "group-14-2",
};

const group102127Data = {
  line24: "/img/line-24-32.png",
  className: "group-14-3",
};

const group102128Data = {
  line24: "/img/line-24-3.png",
  className: "group-14-4",
};

const group102129Data = {
  line24: "/img/line-24-4.png",
  className: "group-14-5",
};

const frame1015Data = {
  className: "frame-99",
  toggleProps: toggle119Data,
  group1021Props: group102125Data,
  group1022Props: group102126Data,
  group1023Props: group102127Data,
  group1024Props: group102128Data,
  group1025Props: group102129Data,
};

const buttonSecondary120Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-42",
};

const toggle120Data = {
  className: "toggle-19",
  buttonSecondaryProps: buttonSecondary120Data,
};

const group102130Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group102131Data = {
  line24: "/img/line-24-6.png",
  className: "group-14-6",
};

const group102132Data = {
  line24: "/img/line-24-7.png",
  className: "group-14-7",
};

const group102133Data = {
  line24: "/img/line-24-18.png",
  className: "group-14-8",
};

const group102134Data = {
  line24: "/img/line-24-19.png",
  className: "group-14",
};

const frame1025Data = {
  className: "frame-100",
  toggleProps: toggle120Data,
  group1021Props: group102130Data,
  group1022Props: group102131Data,
  group1023Props: group102132Data,
  group1024Props: group102133Data,
  group1025Props: group102134Data,
};

const frame1173225Data = {
  className: "frame-116-158",
};

const kaizen2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems239Data,
  navItems3Props: navItems341Data,
  toggleProps: toggle118Data,
  frame101Props: frame1015Data,
  frame102Props: frame1025Data,
  frame11732Props: frame1173225Data,
};

const frame1172251Data = {
  children: "Existing Case",
};

const frame1162252Data = {
  children: "Reference Cases",
};

const frame1132269Data = {
  className: "",
};

const navItems342Data = {
  className: "nav-items-3-42",
  frame1172Props: frame1172251Data,
  frame1162Props: frame1162252Data,
  frame1132Props: frame1132269Data,
};

const buttonSecondary121Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-43",
};

const toggle121Data = {
  className: "toggle-20",
  buttonSecondaryProps: buttonSecondary121Data,
};

const group102135Data = {
  line24: "/img/line-24.png",
  className: "group-15-1",
};

const group102136Data = {
  line24: "/img/line-24-1.png",
  className: "group-15-2",
};

const group102137Data = {
  line24: "/img/line-24-2.png",
  className: "group-15-3",
};

const group102138Data = {
  line24: "/img/line-24-3.png",
  className: "group-15-4",
};

const group102139Data = {
  line24: "/img/line-24-4.png",
  className: "group-15-5",
};

const frame1016Data = {
  className: "frame-95-2",
  toggleProps: toggle121Data,
  group1021Props: group102135Data,
  group1022Props: group102136Data,
  group1023Props: group102137Data,
  group1024Props: group102138Data,
  group1025Props: group102139Data,
};

const buttonSecondary122Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-43",
};

const toggle122Data = {
  className: "toggle-20",
  buttonSecondaryProps: buttonSecondary122Data,
};

const group102140Data = {
  line24: "/img/line-24-5.png",
  className: "group-15-6",
};

const group102141Data = {
  line24: "/img/line-24-6.png",
  className: "group-15-7",
};

const group102142Data = {
  line24: "/img/line-24-7.png",
  className: "group-15-8",
};

const group102143Data = {
  line24: "/img/line-24-18.png",
  className: "group-15-9",
};

const group102144Data = {
  line24: "/img/line-24-19.png",
  className: "group-15",
};

const frame1026Data = {
  className: "frame-96",
  toggleProps: toggle122Data,
  group1021Props: group102140Data,
  group1022Props: group102141Data,
  group1023Props: group102142Data,
  group1024Props: group102143Data,
  group1025Props: group102144Data,
};

const buttonSecondary123Data = {
  children: "2/2",
  className: "button-secondary-43",
};

const toggle123Data = {
  className: "toggle-109",
  buttonSecondaryProps: buttonSecondary123Data,
};

const kanban3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  kaizen: "Kaizen",
  navItems3Props: navItems342Data,
  frame101Props: frame1016Data,
  frame102Props: frame1026Data,
  toggleProps: toggle123Data,
};

const headerMenuDefault52Data = {
  children: "Acquisition",
};

const headerMenuDefault24Data = {
  children: "Modeling",
  className: "menu-item-default-21",
};

const headerMenuDefault25Data = {
  children: "Analysis",
  className: "menu-item-default-22",
};

const headerMenuDefault26Data = {
  children: "Results & Objectives",
  className: "menu-item-default-19-1",
};

const frame2323Data = {
  headerMenuDefault2Props: headerMenuDefault26Data,
};

const pricing39Data = {
  cost: "Cost",
};

const pricing310Data = {
  cost: "Modernization",
  className: "pricing-8-2",
};

const pricing311Data = {
  cost: "Social",
  className: "pricing-5-2",
};

const pricing312Data = {
  cost: "Client/Consumer",
  className: "pricing-7-2",
};

const mesureDePerformancesFuturesData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  label1: "Design",
  label2: "Future performances",
  notesAtteintesPourChaqueCritre: "NOTES ATTEINTES POUR CHAQUE CRITÈRE",
  place: "Quality",
  inputType1: "text",
  inputPlaceholder1: "      /25",
  line211: "/img/line-21@2x.png",
  leadTime: "Lead Time",
  inputType2: "text",
  inputPlaceholder2: "      /25",
  line212: "/img/line-21-5@2x.png",
  environment: "Environment",
  inputType3: "text",
  inputPlaceholder3: "      /25",
  line213: "/img/line-21-5@2x.png",
  xcontinue: "Continue",
  headerMenuDefault5Props: headerMenuDefault52Data,
  headerMenuDefault21Props: headerMenuDefault24Data,
  headerMenuDefault22Props: headerMenuDefault25Data,
  frame232Props: frame2323Data,
  pricing31Props: pricing39Data,
  pricing32Props: pricing310Data,
  pricing33Props: pricing311Data,
  pricing34Props: pricing312Data,
};

const navItems241Data = {
  className: "nav-items-2-40",
};

const frame1172252Data = {
  children: "Existing Case",
};

const frame1162253Data = {
  children: "Reference Cases",
};

const frame1132271Data = {
  className: "",
};

const navItems343Data = {
  className: "nav-items-3-43",
  frame1172Props: frame1172252Data,
  frame1162Props: frame1162253Data,
  frame1132Props: frame1132271Data,
};

const buttonSecondary124Data = {
  children: "1/2",
  className: "button-secondary-86",
};

const toggle124Data = {
  className: "toggle-110",
  buttonSecondaryProps: buttonSecondary124Data,
};

const buttonSecondary125Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-44",
};

const toggle125Data = {
  className: "toggle-21",
  buttonSecondaryProps: buttonSecondary125Data,
};

const group102145Data = {
  line24: "/img/line-24.png",
  className: "group-16-1",
};

const group102146Data = {
  line24: "/img/line-24-1.png",
  className: "group-16-2",
};

const group102147Data = {
  line24: "/img/line-24-32.png",
  className: "group-16-3",
};

const group102148Data = {
  line24: "/img/line-24-3.png",
  className: "",
};

const group102149Data = {
  line24: "/img/line-24-4.png",
  className: "",
};

const frame1017Data = {
  className: "frame-97-2",
  toggleProps: toggle125Data,
  group1021Props: group102145Data,
  group1022Props: group102146Data,
  group1023Props: group102147Data,
  group1024Props: group102148Data,
  group1025Props: group102149Data,
};

const buttonSecondary126Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-44",
};

const toggle126Data = {
  className: "toggle-21",
  buttonSecondaryProps: buttonSecondary126Data,
};

const group102150Data = {
  line24: "/img/line-24-5.png",
  className: "group-16-4",
};

const group102151Data = {
  line24: "/img/line-24-6.png",
  className: "group-16-5",
};

const group102152Data = {
  line24: "/img/line-24-7.png",
  className: "group-16",
};

const group102153Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group102154Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame1027Data = {
  className: "frame-98-2",
  toggleProps: toggle126Data,
  group1021Props: group102150Data,
  group1022Props: group102151Data,
  group1023Props: group102152Data,
  group1024Props: group102153Data,
  group1025Props: group102154Data,
};

const frame1173226Data = {
  className: "frame-116-159",
};

const x5s2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems241Data,
  navItems3Props: navItems343Data,
  toggleProps: toggle124Data,
  frame101Props: frame1017Data,
  frame102Props: frame1027Data,
  frame11732Props: frame1173226Data,
};

const navItems242Data = {
  className: "nav-items-2-41",
};

const frame1172253Data = {
  children: "Existing Case",
};

const frame1162254Data = {
  children: "Reference Cases",
};

const frame1132272Data = {
  className: "",
};

const navItems344Data = {
  className: "nav-items-3-44",
  frame1172Props: frame1172253Data,
  frame1162Props: frame1162254Data,
  frame1132Props: frame1132272Data,
};

const buttonSecondary127Data = {
  children: "1/2",
  className: "button-secondary-45",
};

const toggle127Data = {
  className: "toggle-111",
  buttonSecondaryProps: buttonSecondary127Data,
};

const buttonSecondary128Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-45",
};

const toggle128Data = {
  className: "toggle-22",
  buttonSecondaryProps: buttonSecondary128Data,
};

const group102155Data = {
  line24: "/img/line-24.png",
  className: "group-17-1",
};

const group102156Data = {
  line24: "/img/line-24-1.png",
  className: "group-17-2",
};

const group102157Data = {
  line24: "/img/line-24-2.png",
  className: "group-17-3",
};

const group102158Data = {
  line24: "/img/line-24-3.png",
  className: "group-17-4",
};

const group102159Data = {
  line24: "/img/line-24-4.png",
  className: "group-17-5",
};

const frame1018Data = {
  className: "frame-97-3",
  toggleProps: toggle128Data,
  group1021Props: group102155Data,
  group1022Props: group102156Data,
  group1023Props: group102157Data,
  group1024Props: group102158Data,
  group1025Props: group102159Data,
};

const buttonSecondary129Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-45",
};

const toggle129Data = {
  className: "toggle-22",
  buttonSecondaryProps: buttonSecondary129Data,
};

const group102160Data = {
  line24: "/img/line-24-5.png",
  className: "group-17-6",
};

const group102161Data = {
  line24: "/img/line-24-6.png",
  className: "group-17-7",
};

const group102162Data = {
  line24: "/img/line-24-7.png",
  className: "group-17-8",
};

const group102163Data = {
  line24: "/img/line-24-18.png",
  className: "group-17-9",
};

const group102164Data = {
  line24: "/img/line-24-19.png",
  className: "group-17",
};

const frame1028Data = {
  className: "frame-98-3",
  toggleProps: toggle129Data,
  group1021Props: group102160Data,
  group1022Props: group102161Data,
  group1023Props: group102162Data,
  group1024Props: group102163Data,
  group1025Props: group102164Data,
};

const frame1173227Data = {
  className: "frame-116-160",
};

const kanban2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  navItems2Props: navItems242Data,
  navItems3Props: navItems344Data,
  toggleProps: toggle127Data,
  frame101Props: frame1018Data,
  frame102Props: frame1028Data,
  frame11732Props: frame1173227Data,
};

const navItems243Data = {
  className: "nav-items-2-42",
};

const frame1172254Data = {
  children: "Existing Case",
};

const frame1162255Data = {
  children: "Reference Cases",
};

const frame1132273Data = {
  className: "",
};

const navItems345Data = {
  className: "nav-items-3-45",
  frame1172Props: frame1172254Data,
  frame1162Props: frame1162255Data,
  frame1132Props: frame1132273Data,
};

const buttonSecondary130Data = {
  children: "2/2",
  className: "button-secondary-46",
};

const toggle130Data = {
  className: "toggle-112",
  buttonSecondaryProps: buttonSecondary130Data,
};

const buttonSecondary131Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-46",
};

const toggle131Data = {
  className: "toggle-23",
  buttonSecondaryProps: buttonSecondary131Data,
};

const group102165Data = {
  line24: "/img/line-24.png",
  className: "group-18-1",
};

const group102166Data = {
  line24: "/img/line-24-1.png",
  className: "group-18-2",
};

const group102167Data = {
  line24: "/img/line-24-32.png",
  className: "group-18-3",
};

const group102168Data = {
  line24: "/img/line-24-3.png",
  className: "",
};

const group102169Data = {
  line24: "/img/line-24-4.png",
  className: "",
};

const frame1019Data = {
  className: "frame-95-3",
  toggleProps: toggle131Data,
  group1021Props: group102165Data,
  group1022Props: group102166Data,
  group1023Props: group102167Data,
  group1024Props: group102168Data,
  group1025Props: group102169Data,
};

const buttonSecondary132Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-46",
};

const toggle132Data = {
  className: "toggle-23",
  buttonSecondaryProps: buttonSecondary132Data,
};

const group102170Data = {
  line24: "/img/line-24-5.png",
  className: "group-18-4",
};

const group102171Data = {
  line24: "/img/line-24-6.png",
  className: "group-18-5",
};

const group102172Data = {
  line24: "/img/line-24-7.png",
  className: "group-18",
};

const group102173Data = {
  line24: "/img/line-24-18.png",
  className: "",
};

const group102174Data = {
  line24: "/img/line-24-19.png",
  className: "",
};

const frame1029Data = {
  className: "frame-96-1",
  toggleProps: toggle132Data,
  group1021Props: group102170Data,
  group1022Props: group102171Data,
  group1023Props: group102172Data,
  group1024Props: group102173Data,
  group1025Props: group102174Data,
};

const x5s3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  kanban: "Kanban",
  navItems2Props: navItems243Data,
  navItems3Props: navItems345Data,
  toggleProps: toggle130Data,
  frame101Props: frame1019Data,
  frame102Props: frame1029Data,
};

const frame1172255Data = {
  children: "Existing Case",
};

const frame1162256Data = {
  children: "Reference Cases",
};

const frame1132274Data = {
  className: "",
};

const navItems346Data = {
  className: "nav-items-3-46",
  frame1172Props: frame1172255Data,
  frame1162Props: frame1162256Data,
  frame1132Props: frame1132274Data,
};

const buttonSecondary133Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-47",
};

const toggle133Data = {
  className: "toggle-24",
  buttonSecondaryProps: buttonSecondary133Data,
};

const group102175Data = {
  line24: "/img/line-24-80.png",
};

const group102176Data = {
  line24: "/img/line-24-81.png",
};

const group102177Data = {
  line24: "/img/line-24-82.png",
};

const group102178Data = {
  line24: "/img/line-24-83.png",
};

const group102179Data = {
  line24: "/img/line-24-84.png",
};

const buttonSecondary134Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-47",
};

const toggle134Data = {
  className: "toggle-24",
  buttonSecondaryProps: buttonSecondary134Data,
};

const group102180Data = {
  line24: "/img/line-24-5.png",
};

const group102181Data = {
  line24: "/img/line-24-6.png",
};

const group102182Data = {
  line24: "/img/line-24-7.png",
};

const group102183Data = {
  line24: "/img/line-24-8.png",
};

const group102184Data = {
  line24: "/img/line-24-9.png",
};

const frame1173228Data = {
  className: "frame-116-161",
};

const buttonSecondary135Data = {
  children: "2/3",
  className: "button-secondary-47",
};

const toggle135Data = {
  className: "toggle-113",
  buttonSecondaryProps: buttonSecondary135Data,
};

const leanVSM3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "A quelle fréquence renouvelez vous votre stock?",
  inputType2: "text",
  inputPlaceholder2:
    "combien de temps en moyenne un article effectue dans votre magazin?",
  inputType3: "text",
  inputPlaceholder3:
    "Vous arrive-t-il d’avoir des ruptures de stock? Si oui, à quelle fréquence?",
  inputType4: "text",
  inputPlaceholder4: "Avez vous mis en place de mesures d’amélioration?",
  inputType5: "text",
  inputPlaceholder5: "*******************************************",
  inputType6: "text",
  inputPlaceholder6: "Dans quel rayon se situe vos clients?",
  inputType7: "text",
  inputPlaceholder7: "A quelle fréquence effectuez vous des livraisons?",
  inputType8: "text",
  inputPlaceholder8: "Quel est votre taux de service?",
  inputType9: "text",
  inputPlaceholder9: "Quel est votre taux de retard?",
  inputType10: "text",
  inputPlaceholder10: "*************************************",
  navItems3Props: navItems346Data,
  toggle1Props: toggle133Data,
  group1021Props: group102175Data,
  group1022Props: group102176Data,
  group1023Props: group102177Data,
  group1024Props: group102178Data,
  group1025Props: group102179Data,
  toggle2Props: toggle134Data,
  group1026Props: group102180Data,
  group1027Props: group102181Data,
  group1028Props: group102182Data,
  group1029Props: group102183Data,
  group10210Props: group102184Data,
  frame11732Props: frame1173228Data,
  toggle3Props: toggle135Data,
};

const navItems245Data = {
  className: "nav-items-2-44",
};

const frame1172256Data = {
  children: "Existing Case",
};

const frame1162257Data = {
  children: "Reference Cases",
};

const frame1132275Data = {
  className: "",
};

const navItems347Data = {
  className: "nav-items-3-47",
  frame1172Props: frame1172256Data,
  frame1162Props: frame1162257Data,
  frame1132Props: frame1132275Data,
};

const buttonSecondary136Data = {
  children: "Storage time",
  className: "button-secondary-48",
};

const toggle136Data = {
  className: "toggle-25",
  buttonSecondaryProps: buttonSecondary136Data,
};

const group102185Data = {
  line24: "/img/line-24-80.png",
};

const group102186Data = {
  line24: "/img/line-24-81.png",
};

const group102187Data = {
  line24: "/img/line-24-82.png",
};

const group102188Data = {
  line24: "/img/line-24-83.png",
};

const group102189Data = {
  line24: "/img/line-24-84.png",
};

const buttonSecondary137Data = {
  children: "1/3",
  className: "button-secondary-48",
};

const toggle137Data = {
  className: "toggle-114",
  buttonSecondaryProps: buttonSecondary137Data,
};

const buttonSecondary138Data = {
  children: "Delivery time",
  className: "button-secondary-48",
};

const toggle138Data = {
  className: "toggle-25",
  buttonSecondaryProps: buttonSecondary138Data,
};

const group102190Data = {
  line24: "/img/line-24-5.png",
};

const group102191Data = {
  line24: "/img/line-24-6.png",
};

const group102192Data = {
  line24: "/img/line-24-7.png",
};

const group102193Data = {
  line24: "/img/line-24-8.png",
};

const group102194Data = {
  line24: "/img/line-24-9.png",
};

const frame1173229Data = {
  className: "frame-116-162",
};

const leanVSM2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "A quelle fréquence renouvelez vous votre stock?",
  inputType2: "text",
  inputPlaceholder2:
    "combien de temps en moyenne un article effectue dans votre magazin?",
  inputType3: "text",
  inputPlaceholder3:
    "Vous arrive-t-il d’avoir des ruptures de stock? Si oui, à quelle fréquence?",
  inputType4: "text",
  inputPlaceholder4: "Avez vous mis en place de mesures d’amélioration?",
  inputType5: "text",
  inputPlaceholder5: "*******************************************",
  inputType6: "text",
  inputPlaceholder6: "Dans quel rayon se situe vos clients?",
  inputType7: "text",
  inputPlaceholder7: "A quelle fréquence effectuez vous des livraisons?",
  inputType8: "text",
  inputPlaceholder8: "Quel est votre taux de service?",
  inputType9: "text",
  inputPlaceholder9: "Quel est votre taux de retard?",
  inputType10: "text",
  inputPlaceholder10: "*************************************",
  navItems2Props: navItems245Data,
  navItems3Props: navItems347Data,
  toggle1Props: toggle136Data,
  group1021Props: group102185Data,
  group1022Props: group102186Data,
  group1023Props: group102187Data,
  group1024Props: group102188Data,
  group1025Props: group102189Data,
  toggle2Props: toggle137Data,
  toggle3Props: toggle138Data,
  group1026Props: group102190Data,
  group1027Props: group102191Data,
  group1028Props: group102192Data,
  group1029Props: group102193Data,
  group10210Props: group102194Data,
  frame11732Props: frame1173229Data,
};

const frame1133223Data = {
  className: "frame-113-22",
};

const frame1132276Data = {
  className: "frame-113-84",
};

const frame11820Data = {
  children: "Visual management",
  className: "frame-113-39",
};

const frame83Data = {
  children: (
    <React.Fragment>
      5<br />
      IMPLEMENTATION OF COUNTERMEASURES
    </React.Fragment>
  ),
};

const frame822Data = {
  children: (
    <React.Fragment>
      4<br />
      IDENTIFICATION OF COUNTERMEASURES
    </React.Fragment>
  ),
};

const frame98Data = {
  children: (
    <React.Fragment>
      3<br />
      STUDY OF THE CAUSES
    </React.Fragment>
  ),
};

const kaizen11Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  label1: "Design",
  overlapGroup11: "/img/arrow-1@2x.png",
  arrow9: "/img/arrow-1@2x.png",
  overlapGroup3: "/img/arrow-2@2x.png",
  arrow10: "/img/arrow-2@2x.png",
  line4: "/img/line-2@2x.png",
  line2: "/img/line-2@2x.png",
  label2: "Zoom",
  label3: "Zoom",
  overlapGroup2: "/img/text-format@2x.png",
  textFormat: "/img/text-format@2x.png",
  label4: "Text",
  label5: "Text",
  overlapGroup4: "/img/line-1.png",
  line1: "/img/line-1.png",
  place: "Back",
  label6: "CONTINUOUS IMPROVEMENT PROCESS",
  x1IdentificationOf: (
    <React.Fragment>
      1<br />
      IDENTIFICATION OF THE PROBLEM TO BE TREATED
    </React.Fragment>
  ),
  x2StudyOfTheSituation: (
    <React.Fragment>
      2 <br />
      STUDY OF THE SITUATION
    </React.Fragment>
  ),
  arrow6: "/img/arrow-6-11@2x.png",
  x6AuditOfCountermeasures: (
    <React.Fragment>
      6<br />
      AUDIT OF COUNTERMEASURES
    </React.Fragment>
  ),
  arrow16: "/img/arrow-16-2@2x.png",
  arrow13: "/img/arrow-6-11@2x.png",
  arrow14: "/img/arrow-14-2@2x.png",
  arrow15: "/img/arrow-15-2@2x.png",
  arrow17: "/img/arrow-17-1@2x.png",
  x7StandardizationOfGoodMeasures: (
    <React.Fragment>
      7<br />
      STANDARDIZATION OF GOOD MEASURES
    </React.Fragment>
  ),
  modeling: "Modeling",
  xcontinue: "Continue",
  frame11332Props: frame1133223Data,
  frame11322Props: frame1132276Data,
  frame118Props: frame11820Data,
  frame8Props: frame83Data,
  frame82Props: frame822Data,
  frame9Props: frame98Data,
};

const frame1172257Data = {
  children: "Existing Case",
};

const frame1162258Data = {
  children: "Reference Cases",
};

const frame1132277Data = {
  className: "",
};

const navItems348Data = {
  className: "nav-items-3-48",
  frame1172Props: frame1172257Data,
  frame1162Props: frame1162258Data,
  frame1132Props: frame1132277Data,
};

const buttonSecondary139Data = {
  children: "Leadership 1",
  className: "",
};

const toggle139Data = {
  className: "toggle-115",
  buttonSecondaryProps: buttonSecondary139Data,
};

const ouinon148Data = {
  yes: "Yes",
  place: "No",
};

const frame136123Data = {
  ouinonProps: ouinon148Data,
};

const ouinon149Data = {
  yes: "Yes",
  place: "No",
};

const frame136124Data = {
  ouinonProps: ouinon149Data,
};

const ouinon150Data = {
  yes: "Yes",
  place: "No",
};

const frame136125Data = {
  ouinonProps: ouinon150Data,
};

const ouinon151Data = {
  yes: "Yes",
  place: "No",
};

const frame136126Data = {
  ouinonProps: ouinon151Data,
};

const buttonSecondary140Data = {
  children: "Leadership 2",
  className: "",
};

const toggle140Data = {
  className: "toggle-116",
  buttonSecondaryProps: buttonSecondary140Data,
};

const ouinon152Data = {
  yes: "Yes",
  place: "No",
};

const frame136127Data = {
  ouinonProps: ouinon152Data,
};

const ouinon153Data = {
  yes: "Yes",
  place: "No",
};

const frame136128Data = {
  ouinonProps: ouinon153Data,
};

const ouinon154Data = {
  yes: "Yes",
  place: "No",
};

const frame136129Data = {
  ouinonProps: ouinon154Data,
};

const buttonSecondary141Data = {
  children: "3/7",
  className: "button-secondary-87",
};

const toggle141Data = {
  className: "toggle-117",
  buttonSecondaryProps: buttonSecondary141Data,
};

const quality3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  next: "Next",
  navItems3Props: navItems348Data,
  toggle1Props: toggle139Data,
  frame1361Props: frame136123Data,
  frame1362Props: frame136124Data,
  frame1363Props: frame136125Data,
  frame1364Props: frame136126Data,
  toggle2Props: toggle140Data,
  frame1365Props: frame136127Data,
  frame1366Props: frame136128Data,
  frame1367Props: frame136129Data,
  toggle3Props: toggle141Data,
};

const navItems247Data = {
  className: "nav-items-2-46",
};

const frame1172258Data = {
  children: "Existing Case",
};

const frame1162259Data = {
  children: "Reference Cases",
};

const frame1132278Data = {
  className: "",
};

const navItems349Data = {
  className: "nav-items-3-49",
  frame1172Props: frame1172258Data,
  frame1162Props: frame1162259Data,
  frame1132Props: frame1132278Data,
};

const buttonSecondary142Data = {
  children: "3/3",
  className: "button-secondary-49",
};

const toggle142Data = {
  className: "toggle-118",
  buttonSecondaryProps: buttonSecondary142Data,
};

const buttonSecondary143Data = {
  children: "ISO 50001 Norm",
  className: "button-secondary-49",
};

const toggle143Data = {
  className: "toggle-26",
  buttonSecondaryProps: buttonSecondary143Data,
};

const group102195Data = {
  line24: "/img/line-24-80.png",
  className: "group-21-1",
};

const group102196Data = {
  line24: "/img/line-24-81.png",
  className: "group-21-2",
};

const group102197Data = {
  line24: "/img/line-24-82.png",
  className: "group-21-3",
};

const group102198Data = {
  line24: "/img/line-24-83.png",
  className: "group-21-4",
};

const group102199Data = {
  line24: "/img/line-24-84.png",
  className: "group-21",
};

const buttonSecondary144Data = {
  children: "ISO 14001 Norm",
  className: "button-secondary-49",
};

const toggle144Data = {
  className: "toggle-26",
  buttonSecondaryProps: buttonSecondary144Data,
};

const group102200Data = {
  line24: "/img/line-24-5.png",
  className: "",
};

const group102201Data = {
  line24: "/img/line-24-6.png",
  className: "",
};

const group102202Data = {
  line24: "/img/line-24-7.png",
  className: "",
};

const group102203Data = {
  line24: "/img/line-24-8.png",
  className: "",
};

const group102204Data = {
  line24: "/img/line-24-9.png",
  className: "",
};

const frame10210Data = {
  className: "frame-96-2",
  toggleProps: toggle144Data,
  group1021Props: group102200Data,
  group1022Props: group102201Data,
  group1023Props: group102202Data,
  group1024Props: group102203Data,
  group1025Props: group102204Data,
};

const leanVSM4Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "A quelle fréquence renouvelez vous votre stock?",
  inputType2: "text",
  inputPlaceholder2:
    "combien de temps en moyenne un article effectue dans votre magazin?",
  inputType3: "text",
  inputPlaceholder3:
    "Vous arrive-t-il d’avoir des ruptures de stock? Si oui, à quelle fréquence?",
  inputType4: "text",
  inputPlaceholder4: "Avez vous mis en place de mesures d’amélioration?",
  inputType5: "text",
  inputPlaceholder5: "*******************************************",
  x5S: "5S",
  navItems2Props: navItems247Data,
  navItems3Props: navItems349Data,
  toggle1Props: toggle142Data,
  toggle2Props: toggle143Data,
  group1021Props: group102195Data,
  group1022Props: group102196Data,
  group1023Props: group102197Data,
  group1024Props: group102198Data,
  group1025Props: group102199Data,
  frame102Props: frame10210Data,
};

const headerMenuDefault53Data = {
  children: "Acquisition",
};

const headerMenuDefault54Data = {
  children: "Modeling",
  className: "menu-item-default-32",
};

const headerMenuDefault55Data = {
  children: "Analysis",
  className: "menu-item-default-33",
};

const headerMenuDefault27Data = {
  children: "Results & Objectives",
  className: "menu-item-default-19-1",
};

const frame2324Data = {
  headerMenuDefault2Props: headerMenuDefault27Data,
};

const frame72Data = {
  className: "frame-7-10",
};

const mesureDePerformancesFutures1Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  design: "Design",
  label1: "Design",
  label2: "Future performances",
  finish: "Finish",
  headerMenuDefault51Props: headerMenuDefault53Data,
  headerMenuDefault52Props: headerMenuDefault54Data,
  headerMenuDefault53Props: headerMenuDefault55Data,
  frame232Props: frame2324Data,
  frame7Props: frame72Data,
};

const frame1172259Data = {
  children: "Existing Case",
};

const frame1162260Data = {
  children: "Reference Cases",
};

const frame1132280Data = {
  className: "",
};

const navItems350Data = {
  className: "nav-items-3-50",
  frame1172Props: frame1172259Data,
  frame1162Props: frame1162260Data,
  frame1132Props: frame1132280Data,
};

const frame1122Data = {
  children: "3. Kanban",
  className: "frame-114-112",
};

const existingSystems2Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  existingSystems: "EXISTING SYSTEMS",
  x2SupplementaryModels: "2.   SUPPLEMENTARY MODELS",
  leanVsm: "Lean VSM",
  x4Kaizen: "4. Kaizen",
  x25S: "2. 5S",
  x5Smed: "5. SMED",
  x6VisualManagement: "6. Visual Management",
  ellipse116: "/img/polygon-3@2x.png",
  navItems3Props: navItems350Data,
  frame112Props: frame1122Data,
};

const frame1172260Data = {
  children: "Existing Case",
};

const frame1162261Data = {
  children: "Reference Cases",
};

const frame1132281Data = {
  className: "",
};

const navItems351Data = {
  className: "nav-items-3-51",
  frame1172Props: frame1172260Data,
  frame1162Props: frame1162261Data,
  frame1132Props: frame1132281Data,
};

const buttonSecondary145Data = {
  children: "Changement Climamtique",
  className: "",
};

const toggle145Data = {
  className: "toggle-119",
  buttonSecondaryProps: buttonSecondary145Data,
};

const ouinon155Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-32",
};

const ouinon156Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-33",
};

const buttonSecondary146Data = {
  children: "Autre nuisance",
  className: "",
};

const toggle146Data = {
  className: "toggle-120",
  buttonSecondaryProps: buttonSecondary146Data,
};

const ouinon157Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-34",
};

const ouinon158Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-35",
};

const ouinon159Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-36",
};

const buttonSecondary147Data = {
  children: "5/5",
  className: "button-secondary-88",
};

const toggle147Data = {
  className: "toggle-121",
  buttonSecondaryProps: buttonSecondary147Data,
};

const environmental5Data = {
  x1200PxLogo_Icam__20082: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  socialCriteria: "Social Criteria",
  navItems3Props: navItems351Data,
  toggle1Props: toggle145Data,
  ouinon1Props: ouinon155Data,
  ouinon2Props: ouinon156Data,
  toggle2Props: toggle146Data,
  ouinon3Props: ouinon157Data,
  ouinon4Props: ouinon158Data,
  ouinon5Props: ouinon159Data,
  toggle3Props: toggle147Data,
};

const frame1172261Data = {
  children: "Existing Case",
};

const frame1162262Data = {
  children: "Reference Cases",
};

const frame1132282Data = {
  className: "",
};

const navItems352Data = {
  className: "nav-items-3-52",
  frame1172Props: frame1172261Data,
  frame1162Props: frame1162262Data,
  frame1132Props: frame1132282Data,
};

const buttonSecondary148Data = {
  children: "Conditions de travail et qualité de vie au travail 1",
  className: "",
};

const toggle148Data = {
  className: "toggle-4",
  buttonSecondaryProps: buttonSecondary148Data,
};

const ouinon160Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-37",
};

const ouinon161Data = {
  yes: "Yes",
  place: "No",
  className: "ouinon-38",
};

const buttonSecondary149Data = {
  children: "Conditions de travail et qualité de vie au travail 2",
  className: "",
};

const toggle149Data = {
  className: "toggle-4",
  buttonSecondaryProps: buttonSecondary149Data,
};

const ouinon162Data = {
  yes: "Yes",
  place: "No",
};

const frame136130Data = {
  ouinonProps: ouinon162Data,
};

const ouinon163Data = {
  yes: "Yes",
  place: "No",
};

const frame136131Data = {
  ouinonProps: ouinon163Data,
};

const ouinon164Data = {
  yes: "Yes",
  place: "No",
};

const frame136132Data = {
  ouinonProps: ouinon164Data,
};

const buttonSecondary150Data = {
  children: "3/6",
  className: "button-secondary-89",
};

const toggle150Data = {
  className: "toggle-122",
  buttonSecondaryProps: buttonSecondary150Data,
};

const social3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  navItems3Props: navItems352Data,
  toggle1Props: toggle148Data,
  ouinon1Props: ouinon160Data,
  ouinon2Props: ouinon161Data,
  toggle2Props: toggle149Data,
  frame1361Props: frame136130Data,
  frame1362Props: frame136131Data,
  frame1363Props: frame136132Data,
  toggle3Props: toggle150Data,
};

const frame1172262Data = {
  children: "Existing Case",
};

const frame1162263Data = {
  children: "Reference Cases",
};

const frame1132283Data = {
  className: "",
};

const navItems353Data = {
  className: "nav-items-3-53",
  frame1172Props: frame1172262Data,
  frame1162Props: frame1162263Data,
  frame1132Props: frame1132283Data,
};

const buttonSecondary151Data = {
  children: "Economie Circulaire 1",
  className: "",
};

const toggle151Data = {
  className: "toggle-123",
  buttonSecondaryProps: buttonSecondary151Data,
};

const frame426Data = {
  className: "",
};

const frame436Data = {
  className: "",
};

const ouinon214Data = {
  className: "ouinon-50",
  frame42Props: frame426Data,
  frame43Props: frame436Data,
};

const frame427Data = {
  className: "",
};

const frame437Data = {
  className: "",
};

const ouinon215Data = {
  className: "ouinon-51",
  frame42Props: frame427Data,
  frame43Props: frame437Data,
};

const buttonSecondary152Data = {
  children: "Economie Circulaire 2",
  className: "",
};

const toggle152Data = {
  className: "toggle-124",
  buttonSecondaryProps: buttonSecondary152Data,
};

const frame428Data = {
  className: "frame-4-55-1",
};

const frame438Data = {
  className: "frame-4-63-1",
};

const ouinon216Data = {
  className: "ouinon-52",
  frame42Props: frame428Data,
  frame43Props: frame438Data,
};

const frame429Data = {
  className: "frame-4-55",
};

const frame439Data = {
  className: "frame-4-63",
};

const ouinon217Data = {
  className: "ouinon-53",
  frame42Props: frame429Data,
  frame43Props: frame439Data,
};

const buttonSecondary153Data = {
  children: "Economie Circulaire 3",
  className: "",
};

const toggle153Data = {
  className: "toggle-125",
  buttonSecondaryProps: buttonSecondary153Data,
};

const ouinon165Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-39",
};

const ouinon166Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-40",
};

const ouinon167Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-41",
};

const buttonSecondary154Data = {
  children: "4/5",
  className: "button-secondary-90",
};

const toggle154Data = {
  className: "toggle-126",
  buttonSecondaryProps: buttonSecondary154Data,
};

const environmental4Data = {
  x1200PxLogo_Icam__20082: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems353Data,
  toggle1Props: toggle151Data,
  ouinon21Props: ouinon214Data,
  ouinon22Props: ouinon215Data,
  toggle2Props: toggle152Data,
  ouinon23Props: ouinon216Data,
  ouinon24Props: ouinon217Data,
  toggle3Props: toggle153Data,
  ouinon1Props: ouinon165Data,
  ouinon2Props: ouinon166Data,
  ouinon3Props: ouinon167Data,
  toggle4Props: toggle154Data,
};

const frame1172263Data = {
  children: "Existing Case",
};

const frame1162264Data = {
  children: "Reference Cases",
};

const frame1132284Data = {
  className: "",
};

const navItems354Data = {
  className: "nav-items-3-54",
  frame1172Props: frame1172263Data,
  frame1162Props: frame1162264Data,
  frame1132Props: frame1132284Data,
};

const buttonSecondary155Data = {
  children: "Cyber-physical system (CPS) 1",
  className: "",
};

const toggle155Data = {
  className: "toggle-5",
  buttonSecondaryProps: buttonSecondary155Data,
};

const ouinon168Data = {
  yes: "Yes",
  place: "No",
};

const frame136133Data = {
  ouinonProps: ouinon168Data,
};

const ouinon169Data = {
  yes: "Yes",
  place: "No",
};

const frame136134Data = {
  ouinonProps: ouinon169Data,
};

const buttonSecondary156Data = {
  children: "Cyber-physical system (CPS) 2",
  className: "",
};

const toggle156Data = {
  className: "toggle-5",
  buttonSecondaryProps: buttonSecondary156Data,
};

const ouinon170Data = {
  yes: "Yes",
  place: "No",
};

const frame136135Data = {
  ouinonProps: ouinon170Data,
};

const ouinon171Data = {
  yes: "Yes",
  place: "No",
};

const frame136136Data = {
  className: "frame-153-7",
  ouinonProps: ouinon171Data,
};

const frame1339Data = {
  frame136Props: frame136136Data,
};

const frame1448Data = {
  frame133Props: frame1339Data,
};

const buttonSecondary157Data = {
  children: "3/4",
  className: "button-secondary-91",
};

const toggle157Data = {
  className: "toggle-127",
  buttonSecondaryProps: buttonSecondary157Data,
};

const modernization3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre bilan carbone?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre tonnage de carbone rejeté?",
  navItems3Props: navItems354Data,
  toggle1Props: toggle155Data,
  frame1361Props: frame136133Data,
  frame1362Props: frame136134Data,
  toggle2Props: toggle156Data,
  frame1363Props: frame136135Data,
  frame144Props: frame1448Data,
  toggle3Props: toggle157Data,
};

const frame1172264Data = {
  children: "Existing Case",
};

const frame1162265Data = {
  children: "Reference Cases",
};

const frame1132285Data = {
  className: "",
};

const navItems355Data = {
  className: "nav-items-3-55",
  frame1172Props: frame1172264Data,
  frame1162Props: frame1162265Data,
  frame1132Props: frame1132285Data,
};

const buttonSecondary158Data = {
  children: "Dialogue Social 1",
  className: "",
};

const toggle158Data = {
  className: "toggle-128",
  buttonSecondaryProps: buttonSecondary158Data,
};

const frame4210Data = {
  className: "",
};

const frame4310Data = {
  className: "",
};

const ouinon218Data = {
  frame42Props: frame4210Data,
  frame43Props: frame4310Data,
};

const frame4211Data = {
  className: "",
};

const frame4311Data = {
  className: "",
};

const ouinon219Data = {
  className: "ouinon-55",
  frame42Props: frame4211Data,
  frame43Props: frame4311Data,
};

const frame4212Data = {
  className: "",
};

const frame4312Data = {
  className: "",
};

const ouinon220Data = {
  className: "ouinon-56",
  frame42Props: frame4212Data,
  frame43Props: frame4312Data,
};

const buttonSecondary159Data = {
  children: "Dialogue Social 2",
  className: "",
};

const toggle159Data = {
  className: "toggle-129",
  buttonSecondaryProps: buttonSecondary159Data,
};

const frame4213Data = {
  className: "frame-4-57-1",
};

const frame4313Data = {
  className: "frame-4-65-1",
};

const ouinon221Data = {
  className: "ouinon-47",
  frame42Props: frame4213Data,
  frame43Props: frame4313Data,
};

const frame4214Data = {
  className: "frame-4-57",
};

const frame4314Data = {
  className: "frame-4-65",
};

const ouinon222Data = {
  className: "ouinon-47",
  frame42Props: frame4214Data,
  frame43Props: frame4314Data,
};

const buttonSecondary160Data = {
  children: "Dialogue Social 3",
  className: "",
};

const toggle160Data = {
  className: "toggle-130",
  buttonSecondaryProps: buttonSecondary160Data,
};

const ouinon172Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-23-1",
};

const ouinon173Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-23-2",
};

const ouinon174Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-23",
};

const buttonSecondary161Data = {
  children: "4/6",
  className: "button-secondary-92",
};

const toggle161Data = {
  className: "toggle-131",
  buttonSecondaryProps: buttonSecondary161Data,
};

const social4Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems355Data,
  toggle1Props: toggle158Data,
  ouinon21Props: ouinon218Data,
  ouinon22Props: ouinon219Data,
  ouinon23Props: ouinon220Data,
  toggle2Props: toggle159Data,
  ouinon24Props: ouinon221Data,
  ouinon25Props: ouinon222Data,
  toggle3Props: toggle160Data,
  ouinon1Props: ouinon172Data,
  ouinon2Props: ouinon173Data,
  ouinon3Props: ouinon174Data,
  toggle4Props: toggle161Data,
};

const frame1172265Data = {
  children: "Existing Case",
};

const frame1162266Data = {
  children: "Reference Cases",
};

const frame1132286Data = {
  className: "",
};

const navItems356Data = {
  className: "nav-items-3-56",
  frame1172Props: frame1172265Data,
  frame1162Props: frame1162266Data,
  frame1132Props: frame1132286Data,
};

const buttonSecondary162Data = {
  children: "Développement du capital humain 1",
  className: "",
};

const toggle162Data = {
  className: "toggle-132",
  buttonSecondaryProps: buttonSecondary162Data,
};

const frame4215Data = {
  className: "frame-4-59-1",
};

const frame4315Data = {
  className: "frame-4-67-1",
};

const ouinon223Data = {
  className: "ouinon-57",
  frame42Props: frame4215Data,
  frame43Props: frame4315Data,
};

const frame4216Data = {
  className: "frame-4-59-2",
};

const frame4316Data = {
  className: "frame-4-67-2",
};

const ouinon224Data = {
  className: "ouinon-58",
  frame42Props: frame4216Data,
  frame43Props: frame4316Data,
};

const frame4217Data = {
  className: "frame-4-59",
};

const frame4317Data = {
  className: "frame-4-67",
};

const ouinon225Data = {
  className: "ouinon-59",
  frame42Props: frame4217Data,
  frame43Props: frame4317Data,
};

const buttonSecondary163Data = {
  children: "Développement du capital humain 2",
  className: "",
};

const toggle163Data = {
  className: "toggle-133",
  buttonSecondaryProps: buttonSecondary163Data,
};

const ouinon175Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-25-1",
};

const ouinon176Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-25-2",
};

const ouinon177Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-25",
};

const buttonSecondary164Data = {
  children: "Développement du capital humain 3",
  className: "",
};

const toggle164Data = {
  className: "toggle-134",
  buttonSecondaryProps: buttonSecondary164Data,
};

const ouinon178Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-42",
};

const buttonSecondary165Data = {
  children: "6/6",
  className: "button-secondary-93",
};

const toggle165Data = {
  className: "toggle-135",
  buttonSecondaryProps: buttonSecondary165Data,
};

const social6Data = {
  x1200PxLogo_Icam__20081: "",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  modernizationCriteria: "Modernization criteria",
  navItems3Props: navItems356Data,
  toggle1Props: toggle162Data,
  ouinon21Props: ouinon223Data,
  ouinon22Props: ouinon224Data,
  ouinon23Props: ouinon225Data,
  toggle2Props: toggle163Data,
  ouinon1Props: ouinon175Data,
  ouinon2Props: ouinon176Data,
  ouinon3Props: ouinon177Data,
  toggle3Props: toggle164Data,
  ouinon4Props: ouinon178Data,
  toggle4Props: toggle165Data,
};

const frame1172266Data = {
  children: "Existing Case",
};

const frame1162267Data = {
  children: "Reference Cases",
};

const frame1132287Data = {
  className: "",
};

const navItems357Data = {
  className: "nav-items-3-57",
  frame1172Props: frame1172266Data,
  frame1162Props: frame1162267Data,
  frame1132Props: frame1132287Data,
};

const buttonSecondary166Data = {
  children: "Santé et Sécurité au travail 1",
  className: "",
};

const toggle166Data = {
  className: "toggle-136",
  buttonSecondaryProps: buttonSecondary166Data,
};

const frame4218Data = {
  className: "frame-4-58-1",
};

const frame4318Data = {
  className: "frame-4-66-1",
};

const ouinon226Data = {
  className: "ouinon-60",
  frame42Props: frame4218Data,
  frame43Props: frame4318Data,
};

const frame4219Data = {
  className: "frame-4-58-2",
};

const frame4319Data = {
  className: "frame-4-66-2",
};

const ouinon227Data = {
  className: "ouinon-61",
  frame42Props: frame4219Data,
  frame43Props: frame4319Data,
};

const frame4220Data = {
  className: "frame-4-58-3",
};

const frame4320Data = {
  className: "frame-4-66-3",
};

const ouinon228Data = {
  className: "ouinon-62",
  frame42Props: frame4220Data,
  frame43Props: frame4320Data,
};

const frame4221Data = {
  className: "frame-4-58",
};

const frame4321Data = {
  className: "frame-4-66",
};

const ouinon229Data = {
  className: "ouinon-63",
  frame42Props: frame4221Data,
  frame43Props: frame4321Data,
};

const buttonSecondary167Data = {
  children: "Santé et Sécurité au travail 2",
  className: "",
};

const toggle167Data = {
  className: "toggle-137",
  buttonSecondaryProps: buttonSecondary167Data,
};

const ouinon179Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-26-1",
};

const ouinon180Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-26-2",
};

const ouinon181Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-26",
};

const buttonSecondary168Data = {
  children: "Santé et Sécurité au travail 3",
  className: "",
};

const toggle168Data = {
  className: "toggle-138",
  buttonSecondaryProps: buttonSecondary168Data,
};

const ouinon182Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-43",
};

const buttonSecondary169Data = {
  children: "5/6",
  className: "button-secondary-94",
};

const toggle169Data = {
  className: "toggle-139",
  buttonSecondaryProps: buttonSecondary169Data,
};

const social5Data = {
  x1200PxLogo_Icam__20081: "",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre bilan carbone?",
  inputType6: "text",
  inputPlaceholder6: "Connaissez vous votre bilan carbone?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre bilan carbone?",
  navItems3Props: navItems357Data,
  toggle1Props: toggle166Data,
  ouinon21Props: ouinon226Data,
  ouinon22Props: ouinon227Data,
  ouinon23Props: ouinon228Data,
  ouinon24Props: ouinon229Data,
  toggle2Props: toggle167Data,
  ouinon1Props: ouinon179Data,
  ouinon2Props: ouinon180Data,
  ouinon3Props: ouinon181Data,
  toggle3Props: toggle168Data,
  ouinon4Props: ouinon182Data,
  toggle4Props: toggle169Data,
};

const frame1172267Data = {
  children: "Existing Case",
};

const frame1162268Data = {
  children: "Reference Cases",
};

const frame1132288Data = {
  className: "",
};

const navItems358Data = {
  className: "nav-items-3-58",
  frame1172Props: frame1172267Data,
  frame1162Props: frame1162268Data,
  frame1132Props: frame1132288Data,
};

const buttonSecondary170Data = {
  children: "Information and Communication Technoly (ICT)",
  className: "",
};

const toggle170Data = {
  className: "toggle-6",
  buttonSecondaryProps: buttonSecondary170Data,
};

const ouinon183Data = {
  yes: "Yes",
  place: "No",
};

const frame136137Data = {
  ouinonProps: ouinon183Data,
};

const ouinon184Data = {
  yes: "Yes",
  place: "No",
};

const frame136138Data = {
  ouinonProps: ouinon184Data,
};

const ouinon185Data = {
  yes: "Yes",
  place: "No",
};

const frame136139Data = {
  ouinonProps: ouinon185Data,
};

const ouinon186Data = {
  yes: "Yes",
  place: "No",
};

const frame136140Data = {
  ouinonProps: ouinon186Data,
};

const ouinon187Data = {
  yes: "Yes",
  place: "No",
};

const frame136141Data = {
  ouinonProps: ouinon187Data,
};

const ouinon188Data = {
  yes: "Yes",
  place: "No",
};

const frame136142Data = {
  ouinonProps: ouinon188Data,
};

const ouinon189Data = {
  yes: "Yes",
  place: "No",
};

const frame136143Data = {
  ouinonProps: ouinon189Data,
};

const buttonSecondary171Data = {
  children: "Human machine interaction (HMI)",
  className: "",
};

const toggle171Data = {
  className: "toggle-6",
  buttonSecondaryProps: buttonSecondary171Data,
};

const ouinon190Data = {
  yes: "Yes",
  place: "No",
};

const frame136144Data = {
  ouinonProps: ouinon190Data,
};

const buttonSecondary172Data = {
  children: "4/4",
  className: "button-secondary-95",
};

const toggle172Data = {
  className: "toggle-140",
  buttonSecondaryProps: buttonSecondary172Data,
};

const modernization4Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType5: "text",
  inputPlaceholder5: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre bilan carbone?",
  leadTimeCriteria: "Lead time criteria",
  navItems3Props: navItems358Data,
  toggle1Props: toggle170Data,
  frame1361Props: frame136137Data,
  frame1362Props: frame136138Data,
  frame1363Props: frame136139Data,
  frame1364Props: frame136140Data,
  frame1365Props: frame136141Data,
  frame1366Props: frame136142Data,
  frame1367Props: frame136143Data,
  toggle2Props: toggle171Data,
  frame1368Props: frame136144Data,
  toggle3Props: toggle172Data,
};

const frame1172268Data = {
  children: "Existing Case",
};

const frame1162269Data = {
  children: "Reference Cases",
};

const frame1132289Data = {
  className: "",
};

const navItems359Data = {
  className: "nav-items-3-59",
  frame1172Props: frame1172268Data,
  frame1162Props: frame1162269Data,
  frame1132Props: frame1132289Data,
};

const buttonSecondary173Data = {
  children: "External Providers 1",
  className: "",
};

const toggle173Data = {
  className: "toggle-30",
  buttonSecondaryProps: buttonSecondary173Data,
};

const ouinon191Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-1",
};

const ouinon192Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-2",
};

const ouinon193Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-3",
};

const buttonSecondary174Data = {
  children: "External Providers 2",
  className: "",
};

const toggle174Data = {
  className: "toggle-30",
  buttonSecondaryProps: buttonSecondary174Data,
};

const ouinon194Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-4",
};

const ouinon195Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-44",
};

const buttonSecondary175Data = {
  children: "Process Approach",
  className: "",
};

const toggle175Data = {
  className: "toggle-141",
  buttonSecondaryProps: buttonSecondary175Data,
};

const ouinon196Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-5",
};

const ouinon197Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-6",
};

const ouinon198Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27-7",
};

const ouinon199Data = {
  place: "Yes",
  yes: "No",
  className: "ouinon-27",
};

const frame1112Data = {
  toggle1Props: toggle173Data,
  ouinon1Props: ouinon191Data,
  ouinon2Props: ouinon192Data,
  ouinon3Props: ouinon193Data,
  toggle2Props: toggle174Data,
  ouinon4Props: ouinon194Data,
  ouinon5Props: ouinon195Data,
  toggle3Props: toggle175Data,
  ouinon6Props: ouinon196Data,
  ouinon7Props: ouinon197Data,
  ouinon8Props: ouinon198Data,
  ouinon9Props: ouinon199Data,
};

const buttonSecondary176Data = {
  children: "8/8",
  className: "button-secondary-96",
};

const toggle176Data = {
  className: "toggle-142",
  buttonSecondaryProps: buttonSecondary176Data,
};

const navItems258Data = {
  className: "nav-items-2-57",
};

const frame1172269Data = {
  children: "Existing Case",
};

const frame1162270Data = {
  children: "Reference Cases",
};

const frame1132290Data = {
  className: "",
};

const navItems360Data = {
  className: "nav-items-3-60",
  frame1172Props: frame1172269Data,
  frame1162Props: frame1162270Data,
  frame1132Props: frame1132290Data,
};

const buttonSecondary177Data = {
  children: "Customer Requirements 1",
  className: "",
};

const toggle177Data = {
  className: "toggle-143",
  buttonSecondaryProps: buttonSecondary177Data,
};

const ouinon200Data = {
  yes: "Yes",
  place: "No",
};

const frame136145Data = {
  ouinonProps: ouinon200Data,
};

const ouinon201Data = {
  yes: "Yes",
  place: "No",
};

const frame136146Data = {
  ouinonProps: ouinon201Data,
};

const ouinon202Data = {
  yes: "Yes",
  place: "No",
};

const frame136147Data = {
  ouinonProps: ouinon202Data,
};

const buttonSecondary178Data = {
  children: "Customer Requirements 2",
  className: "",
};

const toggle178Data = {
  className: "toggle-144",
  buttonSecondaryProps: buttonSecondary178Data,
};

const ouinon203Data = {
  yes: "Yes",
  place: "No",
};

const frame136148Data = {
  ouinonProps: ouinon203Data,
};

const ouinon204Data = {
  yes: "Yes",
  place: "No",
};

const frame136149Data = {
  ouinonProps: ouinon204Data,
};

const ouinon205Data = {
  yes: "Yes",
  place: "No",
};

const frame136150Data = {
  ouinonProps: ouinon205Data,
};

const buttonSecondary179Data = {
  children: "Customer Requirements 3",
  className: "",
};

const toggle179Data = {
  className: "toggle-145",
  buttonSecondaryProps: buttonSecondary179Data,
};

const ouinon206Data = {
  yes: "Yes",
  place: "No",
};

const frame136151Data = {
  ouinonProps: ouinon206Data,
};

const ouinon207Data = {
  yes: "Yes",
  place: "No",
};

const frame136152Data = {
  className: "frame-153-8",
  ouinonProps: ouinon207Data,
};

const frame13310Data = {
  frame136Props: frame136152Data,
};

const frame1449Data = {
  frame133Props: frame13310Data,
};

const ouinon208Data = {
  yes: "Yes",
  place: "No",
};

const frame136153Data = {
  ouinonProps: ouinon208Data,
};

const buttonSecondary180Data = {
  children: "1/8",
  className: "button-secondary-97",
};

const toggle180Data = {
  className: "toggle-146",
  buttonSecondaryProps: buttonSecondary180Data,
};

const clientConsommateur3Data = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  inputType1: "text",
  inputPlaceholder1: "Connaissez vous votre bilan carbone?",
  inputType2: "text",
  inputPlaceholder2: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType3: "text",
  inputPlaceholder3: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType4: "text",
  inputPlaceholder4: "Connaissez vous votre bilan carbone?",
  inputType5: "text",
  inputPlaceholder5: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType6: "text",
  inputPlaceholder6: "De quel type de chauffage sont équipés vos bâtiments?",
  inputType7: "text",
  inputPlaceholder7: "Connaissez vous votre bilan carbone?",
  inputType8: "text",
  inputPlaceholder8: "Connaissez vous votre tonnage de carbone rejeté?",
  inputType9: "text",
  inputPlaceholder9: "De quel type de chauffage sont équipés vos bâtiments?",
  goOnToTheNextStep: "Go on to the next step",
  navItems2Props: navItems258Data,
  navItems3Props: navItems360Data,
  toggle1Props: toggle177Data,
  frame1361Props: frame136145Data,
  frame1362Props: frame136146Data,
  frame1363Props: frame136147Data,
  toggle2Props: toggle178Data,
  frame1364Props: frame136148Data,
  frame1365Props: frame136149Data,
  frame1366Props: frame136150Data,
  toggle3Props: toggle179Data,
  frame1367Props: frame136151Data,
  frame144Props: frame1449Data,
  frame1368Props: frame136153Data,
  toggle4Props: toggle180Data,
};

const frame1133225Data = {
  className: "frame-113-24",
};

const frame11778Data = {
  className: "frame-117-142",
};

const frame114264Data = {
  className: "frame-114-152",
};

const frame1132291Data = {
  className: "frame-113-99",
};

const referencesData = {
  resultsPropositions: "Results & Propositions",
  label1: "Existing case",
  label2: "Reference case",
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  inputType1: "text",
  inputPlaceholder1: "      /25",
  tracbility: "Tracbility",
  place1: "Quality",
  vector371: "/img/vector-37@2x.png",
  vector372: "/img/vector-37-1@2x.png",
  vector38: "/img/vector-37-1@2x.png",
  product: "Product",
  validation: "Validation",
  iso9001Isf: "ISO 9001 (ISF)",
  vector373: "/img/vector-37-1@2x.png",
  processValidation: "Process Validation",
  line211: "/img/line-21@2x.png",
  cost: "Cost",
  inputType2: "text",
  inputPlaceholder2: "      /25",
  line212: "/img/line-21-1@2x.png",
  vector374: "/img/vector-37-3@2x.png",
  vector375: "/img/vector-37-4@2x.png",
  vector376: "/img/vector-37-5@2x.png",
  vector377: "/img/vector-37-6@2x.png",
  transportCost: "Transport cost",
  manufacturingCost: "Manufacturing cost",
  deliveryCost: "Delivery cost",
  exportCost: "Export cost",
  modernisation: "Modernisation",
  inputType3: "text",
  inputPlaceholder3: "      /25",
  line213: "/img/line-21-1@2x.png",
  vector378: "/img/vector-37-3@2x.png",
  vector379: "/img/vector-37-4@2x.png",
  vector3710: "/img/vector-37-5@2x.png",
  vector3711: "/img/vector-37-6@2x.png",
  supplyChain40: "Supply chain 4.0",
  informationSystem: "Information system",
  ergonomics: "Ergonomics",
  newTechnologiesAiRoboticsEtc: "New technologies (AI, robotics, etc.)",
  leadTime: "Lead Time",
  inputType4: "text",
  inputPlaceholder4: "      /25",
  line214: "/img/line-21-3@2x.png",
  vector3712: "/img/vector-37-11@2x.png",
  vector3713: "/img/vector-37-12@2x.png",
  vector3714: "/img/vector-37-13@2x.png",
  manufacturingTime: "Manufacturing time",
  deliveryTime: "Delivery time",
  storageTime: "Storage time",
  place2: "Back",
  propositions: "Propositions",
  frame11332Props: frame1133225Data,
  frame117Props: frame11778Data,
  frame1142Props: frame114264Data,
  frame11322Props: frame1132291Data,
};

const frame1172270Data = {
  children: "Existing Case",
};

const frame1162271Data = {
  children: "Reference Cases",
};

const frame1132292Data = {
  className: "",
};

const navItems361Data = {
  className: "nav-items-3-61",
  frame1172Props: frame1172270Data,
  frame1162Props: frame1162271Data,
  frame1132Props: frame1132292Data,
};

const frame1133226Data = {
  className: "frame-113-25",
};

const curPerformanceData = {
  navItems3Props: navItems361Data,
  frame11332Props: frame1133226Data,
};

const headerMenuDefault62Data = {
  children: "New Case",
};

const headerMenuDefault56Data = {
  children: "Existing Case",
  className: "menu-item-default-27-1",
};

const headerMenuDefault57Data = {
  children: "Reference Case",
  className: "menu-item-default-27-2",
};

const headerMenuDefault15Data = {
  children: "Logout",
};

const headerMenuDefault58Data = {
  children: "Modeling",
  className: "menu-item-default-34",
};

const headerMenuDefault59Data = {
  children: "Analysis",
  className: "menu-item-default-27",
};

const headerMenuDefault63Data = {
  children: "Results & Objectives",
  className: "menu-item-default-38",
};

const buttonSecondary181Data = {
  children: "1/2",
  className: "button-secondary-50",
};

const toggle181Data = {
  className: "toggle-147",
  buttonSecondaryProps: buttonSecondary181Data,
};

const buttonSecondary182Data = {
  children: "Next",
  className: "button-secondary-50",
};

const toggle182Data = {
  className: "toggle-148",
  buttonSecondaryProps: buttonSecondary182Data,
};

const leadTimeData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  label1: "Home",
  label2: "Design",
  headerMenuDefault61Props: headerMenuDefault62Data,
  headerMenuDefault51Props: headerMenuDefault56Data,
  headerMenuDefault52Props: headerMenuDefault57Data,
  headerMenuDefaultProps: headerMenuDefault15Data,
  headerMenuDefault53Props: headerMenuDefault58Data,
  headerMenuDefault54Props: headerMenuDefault59Data,
  headerMenuDefault62Props: headerMenuDefault63Data,
  toggle1Props: toggle181Data,
  toggle2Props: toggle182Data,
};

const headerMenuDefault64Data = {
  children: "New Case",
};

const headerMenuDefault510Data = {
  children: "Existing Case",
  className: "menu-item-default-28-1",
};

const headerMenuDefault511Data = {
  children: "Reference Case",
  className: "menu-item-default-28-2",
};

const headerMenuDefault16Data = {
  children: "Logout",
};

const headerMenuDefault512Data = {
  children: "Modeling",
  className: "menu-item-default-35",
};

const headerMenuDefault513Data = {
  children: "Analysis",
  className: "menu-item-default-28",
};

const headerMenuDefault65Data = {
  children: "Results & Objectives",
  className: "menu-item-default-40",
};

const buttonSecondary183Data = {
  children: "1/2",
  className: "button-secondary-98",
};

const toggle183Data = {
  className: "toggle-149",
  buttonSecondaryProps: buttonSecondary183Data,
};

const buttonSecondary184Data = {
  children: "Next",
  className: "button-secondary-99",
};

const toggle184Data = {
  className: "toggle-150",
  buttonSecondaryProps: buttonSecondary184Data,
};

const costData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  label1: "Home",
  label2: "Design",
  headerMenuDefault61Props: headerMenuDefault64Data,
  headerMenuDefault51Props: headerMenuDefault510Data,
  headerMenuDefault52Props: headerMenuDefault511Data,
  headerMenuDefaultProps: headerMenuDefault16Data,
  headerMenuDefault53Props: headerMenuDefault512Data,
  headerMenuDefault54Props: headerMenuDefault513Data,
  headerMenuDefault62Props: headerMenuDefault65Data,
  toggle1Props: toggle183Data,
  toggle2Props: toggle184Data,
};

const avatarsData = {
  ellipse83: "/img/ellipse-83-3@2x.png",
  ellipse81: "/img/ellipse-81@2x.png",
};

const buttonSecondary185Data = {
  children: "2/2",
  className: "button-secondary-51",
};

const toggle185Data = {
  className: "toggle-151",
  buttonSecondaryProps: buttonSecondary185Data,
};

const headerMenuDefault66Data = {
  children: "New Case",
};

const headerMenuDefault514Data = {
  children: "Existing Case",
  className: "menu-item-default-29-1",
};

const headerMenuDefault515Data = {
  children: "Reference Case",
  className: "menu-item-default-29-2",
};

const headerMenuDefault17Data = {
  children: "Logout",
};

const headerMenuDefault516Data = {
  children: "Modeling",
  className: "menu-item-default-36",
};

const headerMenuDefault517Data = {
  children: "Analysis",
  className: "menu-item-default-29",
};

const headerMenuDefault67Data = {
  children: "Results & Objectives",
  className: "menu-item-default-42",
};

const buttonSecondary186Data = {
  children: "Information System",
  className: "button-secondary-51",
};

const toggle186Data = {
  className: "toggle-27",
  buttonSecondaryProps: buttonSecondary186Data,
};

const group102205Data = {
  line24: "/img/line-24-39.png",
};

const group102206Data = {
  line24: "/img/line-24-40.png",
};

const group102207Data = {
  line24: "/img/line-24-75.png",
};

const group102208Data = {
  line24: "/img/line-24-42.png",
};

const group102209Data = {
  line24: "/img/line-24-43.png",
};

const buttonSecondary187Data = {
  children: "New Technologies (IA, Robotics)",
  className: "button-secondary-51",
};

const toggle187Data = {
  className: "toggle-27",
  buttonSecondaryProps: buttonSecondary187Data,
};

const group102210Data = {
  line24: "/img/line-24-10.png",
  className: "group-22-2",
};

const group102211Data = {
  line24: "/img/line-24-16.png",
  className: "group-22-3",
};

const group102212Data = {
  line24: "/img/line-24-17.png",
  className: "group-22-4",
};

const group102213Data = {
  line24: "/img/line-24-81.png",
  className: "group-22-5",
};

const group102214Data = {
  line24: "/img/line-24-48.png",
  className: "group-22",
};

const buttonSecondary188Data = {
  children: "Lead time criteria",
  className: "button-secondary-100",
};

const toggle188Data = {
  className: "toggle-152",
  buttonSecondaryProps: buttonSecondary188Data,
};

const modernizationData = {
  x1200PxLogo_Icam__20081: "/img/1200px-logo-icam---2008-1@2x.png",
  admin: "ADMIN",
  pleaseAnswerTheFollowingQuestions: "PLEASE ANSWER THE FOLLOWING QUESTIONS",
  label1: "Home",
  label2: "Design",
  inputType1: "text",
  inputPlaceholder1: "Utilisez vous une ERP?",
  inputType2: "text",
  inputPlaceholder2: "Utilisez vous  cette ERP pour passer les commandes?",
  inputType3: "text",
  inputPlaceholder3:
    "Quel canal utilisez vous pour communiquer dans l’entreprise? ",
  inputType4: "text",
  inputPlaceholder4: "*******************************************",
  inputType5: "text",
  inputPlaceholder5: "*******************************************",
  inputType6: "text",
  inputPlaceholder6: "Utilisez vous des robots?",
  inputType7: "text",
  inputPlaceholder7: "utilisez des RPA?",
  inputType8: "text",
  inputPlaceholder8:
    "Modélisez vous vos processus 3D pour une meilleure visibilité?",
  inputType9: "text",
  inputPlaceholder9: "***********************************************",
  inputType10: "text",
  inputPlaceholder10: "*************************************",
  avatarsProps: avatarsData,
  toggle1Props: toggle185Data,
  headerMenuDefault61Props: headerMenuDefault66Data,
  headerMenuDefault51Props: headerMenuDefault514Data,
  headerMenuDefault52Props: headerMenuDefault515Data,
  headerMenuDefaultProps: headerMenuDefault17Data,
  headerMenuDefault53Props: headerMenuDefault516Data,
  headerMenuDefault54Props: headerMenuDefault517Data,
  headerMenuDefault62Props: headerMenuDefault67Data,
  toggle2Props: toggle186Data,
  group1021Props: group102205Data,
  group1022Props: group102206Data,
  group1023Props: group102207Data,
  group1024Props: group102208Data,
  group1025Props: group102209Data,
  toggle3Props: toggle187Data,
  group1026Props: group102210Data,
  group1027Props: group102211Data,
  group1028Props: group102212Data,
  group1029Props: group102213Data,
  group10210Props: group102214Data,
  toggle4Props: toggle188Data,
};
