import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Excelscreen from './src/components/screens/Documentos/EXCEL/Excel';
import ExcelDetailScreen from './src/components/screens/Documentos/EXCEL/ExcelDetalhes';
import WelcomeScreen from './src/components/screens/welcome/Welcome';
import LoginScreen from './src/components/screens/Login/Login';
import AuthProvider from './src/components/context/AuthContext';
import RegisterScreen from './src/components/screens/Register/Register';
import Rotas from './src/components/routes/Rotas';
import CompanyScreen from './src/components/screens/Empresa/CompanyScreen';
import CreateCompanyScreen from './src/components/screens/NovaEmpresa/CreateCompanyScreen';
import CompanyDetailScreen from './src/components/screens/EmpresaDetalhes/CompanyDetailScreen';
import GerenciarDocumentos from './src/components/screens/GerenciarDocumentos/GerenciarDocumentos';
import OSscreen from './src/components/screens/Documentos/OS/OSscreen';
import OSDetailScreen from './src/components/screens/Documentos/OSdetalhes/OSdetalhes';
import APRDetailScreen from './src/components/screens/Documentos/APRdetalhes.js/APRdetalhes';
import APRscreen from './src/components/screens/Documentos/APR/APRscreen';
import LTCATDetailScreen from './src/components/screens/Documentos/LTCATdetalhes/LTCATdetalhes';
import LTCATScreen from './src/components/screens/Documentos/LTCAT/LTCATscreen';
import PCMSODetailScreen from './src/components/screens/Documentos/PCMSOdetalhes/PCMSOdetalhes';
import PCMSOScreen from './src/components/screens/Documentos/PCMSO/PCMSOscreen';
import PGRDetailScreen from './src/components/screens/Documentos/PGRdetalhes/PGRdetalhes';
import PGRscreen from './src/components/screens/Documentos/PGR/PGRscreen';
import PTDetailScreen from './src/components/screens/Documentos/PTdetalhes/PTdetalhes';
import PTscreen from './src/components/screens/Documentos/PT/PTscreen';
import DetalhesItem from './src/components/screens/BancoD/BancoDdetalhes';
import Download from './src/components/screens/Servidor/download';
import Arquivos from './src/components/screens/Arquivos/Arquivos';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">

          <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{headerShown: false}}/>

          <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}}/>

          <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="Rotas" 
          component={Rotas} 
          options={{ headerShown: false }} />

          <Stack.Screen 
          name="Company" 
          component={CompanyScreen}
          options={{title: 'Voltar'}}/>

          <Stack.Screen 
          name="CreateCompany" 
          component={CreateCompanyScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="CompanyDetail" 
          component={CompanyDetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="Excel" 
          component={Excelscreen} 
          options={{title: 'Voltar'}}/>

          <Stack.Screen 
          name="ExcelDetalhes" 
          component={ExcelDetailScreen} 
          options={{title: 'Voltar'}}/>

          <Stack.Screen 
          name="GerenciarDocumentos" 
          component={GerenciarDocumentos}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="OSscreen" 
          component={OSscreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="OSdetalhes" 
          component={OSDetailScreen}
          options={{title: 'Voltar'}} />
          
          <Stack.Screen 
          name="APRscreen" 
          component={APRscreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="APRdetalhes" 
          component={APRDetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="LTCATdetalhes" 
          component={LTCATDetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="LTCATScreen" 
          component={LTCATScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PCMSOScreen" 
          component={PCMSOScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PCMSOdetalhes" 
          component={PCMSODetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PGRscreen" 
          component={PGRscreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PGRdetalhes" 
          component={PGRDetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PTscreen" 
          component={PTscreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="PTdetalhes" 
          component={PTDetailScreen}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="DetalhesItem" 
          component={DetalhesItem}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="Download" 
          component={Download}
          options={{title: 'Voltar'}} />

          <Stack.Screen 
          name="Arquivos" 
          component={Arquivos}
          options={{title: 'Voltar'}} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}