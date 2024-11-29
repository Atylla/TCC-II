import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        checkLoginStatus();
    }, []);

  
    const register = async (username, email, password) => {
       
        const existingUserByEmail = await AsyncStorage.getItem(email);
        const existingUserByUsername = await AsyncStorage.getItem(`username_${username}`);
        
        if (existingUserByEmail || existingUserByUsername) {
            return false; 
        }
    
        const newUser = { username, email, password };
    
        await AsyncStorage.setItem(email, JSON.stringify(newUser));
    
        await AsyncStorage.setItem(`username_${username}`, email); 
    
        await AsyncStorage.setItem(email + '_companies', JSON.stringify([]));
        return true;
    };

    const login = async (email, password) => {
        const storedUser = await AsyncStorage.getItem(email);
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData && userData.password === password) {
            setUser(userData);
            await AsyncStorage.setItem('user', JSON.stringify(userData)); 
            return true;
        }
        return false; 
    };
    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('user'); 
    };
    const deleteUserAccount = async (email) => {
        const storedUser = await AsyncStorage.getItem(email);
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (!userData) {
            return false; 
        }
    
       
        const companiesKey = `${email}_companies`;
        const storedCompanies = await AsyncStorage.getItem(companiesKey);
        const companies = storedCompanies ? JSON.parse(storedCompanies) : [];
    
        for (const company of companies) {
            await deleteCompany(company.name); 
        }
    
        
        await AsyncStorage.removeItem(email); 
        await AsyncStorage.removeItem(companiesKey); 
    
        
        await AsyncStorage.removeItem(`username_${userData.username}`);
    
       
        const userFolderUri = FileSystem.documentDirectory + 'sandbox/' + email + '/'; 
        const folderInfo = await FileSystem.getInfoAsync(userFolderUri);
        if (folderInfo.exists) {
            
            const filesInFolder = await FileSystem.readDirectoryAsync(userFolderUri);
            for (const file of filesInFolder) {
                const fileUri = userFolderUri + file;
                await FileSystem.deleteAsync(fileUri);
            }
            
            await FileSystem.deleteAsync(userFolderUri);
        }
    
        
        await logout(); 
    
        return true; 
    };

    const addCompany = async (company) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; 
            const existingCompanies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];
            existingCompanies.push(company);
            await AsyncStorage.setItem(emailKey + '_companies', JSON.stringify(existingCompanies));
        }
    };
    
    const getCompanies = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; 
            const companies = await AsyncStorage.getItem(emailKey + '_companies');
            return companies ? JSON.parse(companies) : [];
        }
        return [];
    };

    const deleteCompany = async (companyName) => {
        if (user) {
            const emailKey = user.email;
            const companyKey = `${emailKey}_companies`;
    
            const existingCompanies = JSON.parse(await AsyncStorage.getItem(companyKey)) || [];
    
            
            const updatedCompanies = existingCompanies.filter(company => company.name !== companyName);
            await AsyncStorage.setItem(companyKey, JSON.stringify(updatedCompanies));
    
            
            const companyPGRKey = `${emailKey}_${companyName}_PGRs`;
            await AsyncStorage.removeItem(companyPGRKey); 

            const companyPCMSOKey = `${emailKey}_${companyName}_PCMSO`;
            await AsyncStorage.removeItem(companyPCMSOKey); 

            const companyLTCATKey = `${emailKey}_${companyName}_LTCAT`;
            await AsyncStorage.removeItem(companyLTCATKey); 

            const companyAPRKey = `${emailKey}_${companyName}_APR`;
            await AsyncStorage.removeItem(companyAPRKey); 

            const companyOSKey = `${emailKey}_${companyName}_OS`;
            await AsyncStorage.removeItem(companyOSKey); 

            const companyPTKey = `${emailKey}_${companyName}_PT`;
            await AsyncStorage.removeItem(companyPTKey); 

            const companyExcelKey = `${emailKey}_${companyName}_Excel`;
            await AsyncStorage.removeItem(companyExcelKey); 
        
        }
    };


    //Sessao para adicionar PGR, PCMSO e LTCAT
    const addPGR = async (companyName, pgrData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            // Encontrar a empresa específica para adicionar o PGR
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                // Adicionar o PGR à lista de documentos ou checklists da empresa
                const companyPGRKey = `${emailKey}_${companyName}_PGRs`; // Chave única para os PGRs da empresa
                const existingPGRs = JSON.parse(await AsyncStorage.getItem(companyPGRKey)) || [];
                existingPGRs.push(pgrData); // Adiciona o novo PGR

                // Salvar a lista atualizada de PGRs
                await AsyncStorage.setItem(companyPGRKey, JSON.stringify(existingPGRs));
            }
        }
    };

    const addPCMSO = async (companyName, pcmsoData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; 
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                
                const companyPCMSOKey = `${emailKey}_${companyName}_PCMSO`; 
                const existingPCMSOs = JSON.parse(await AsyncStorage.getItem(companyPCMSOKey)) || [];
                existingPCMSOs.push(pcmsoData); 

                
                await AsyncStorage.setItem(companyPCMSOKey, JSON.stringify(existingPCMSOs));
            }
        }
    };

    const addLTCAT = async (companyName, ltcatData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            // Encontrar a empresa específica para adicionar o LTCAT
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                // Adicionar o LTCAT à lista de documentos ou checklists da empresa
                const companyLTCATKey = `${emailKey}_${companyName}_LTCAT`; // Chave única para os LTCATs da empresa
                const existingLTCATs = JSON.parse(await AsyncStorage.getItem(companyLTCATKey)) || [];
                existingLTCATs.push(ltcatData); // Adiciona o novo LTCAT

                // Salvar a lista atualizada de LTCATs
                await AsyncStorage.setItem(companyLTCATKey, JSON.stringify(existingLTCATs));
            }
        }
    };

    const addAPR = async (companyName, aprData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            // Encontrar a empresa específica para adicionar o APR
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                // Adicionar o APR à lista de documentos ou checklists da empresa
                const companyAPRKey = `${emailKey}_${companyName}_APR`; // Chave única para os APRs da empresa
                const existingAPRs = JSON.parse(await AsyncStorage.getItem(companyAPRKey)) || [];
                existingAPRs.push(aprData); // Adiciona o novo APR

                // Salvar a lista atualizada de APRs
                await AsyncStorage.setItem(companyAPRKey, JSON.stringify(existingAPRs));
            }
        }
    };

    const addOS = async (companyName, osData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            // Encontrar a empresa específica para adicionar a OS
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                // Adicionar a OS à lista de documentos ou checklists da empresa
                const companyOSKey = `${emailKey}_${companyName}_OS`; // Chave única para as OSs da empresa
                const existingOSs = JSON.parse(await AsyncStorage.getItem(companyOSKey)) || [];
                existingOSs.push(osData); // Adiciona a nova OS

                // Salvar a lista atualizada de OSs
                await AsyncStorage.setItem(companyOSKey, JSON.stringify(existingOSs));
            }
        }
    };

    const addPT = async (companyName, ptData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];

            // Encontrar a empresa específica para adicionar o PT
            const companyIndex = companies.findIndex(company => company.name === companyName);

            if (companyIndex !== -1) {
                const company = companies[companyIndex];

                // Adicionar o PT à lista de documentos ou checklists da empresa            
                const companyPTKey = `${emailKey}_${companyName}_PT`; // Chave única para os PTs da empresa
                const existingPTs = JSON.parse(await AsyncStorage.getItem(companyPTKey)) || [];
                existingPTs.push(ptData); // Adiciona o novo PT

                // Salvar a lista atualizada de PTs
                await AsyncStorage.setItem(companyPTKey, JSON.stringify(existingPTs));
            }
        }
    };

    const addExcel = async (companyName, excelData) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    console.log("Dados adicionados ao AsyncStorage:", excelData);
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companies = JSON.parse(await AsyncStorage.getItem(emailKey + '_companies')) || [];
    
            // Encontrar a empresa específica para adicionar o Excel
            const companyIndex = companies.findIndex(company => company.name === companyName);
    
            if (companyIndex !== -1) {
                const company = companies[companyIndex];
    
                // Adicionar o Excel à lista de documentos ou checklists da empresa
                const companyExcelKey = `${emailKey}_${companyName}_Excel`; // Chave única para os Excel da empresa (corrigido)
                const existingExcel = JSON.parse(await AsyncStorage.getItem(companyExcelKey)) || [];
                existingExcel.push(excelData); // Adiciona o novo Excel
    
                // Salvar a lista atualizada de Excel
                await AsyncStorage.setItem(companyExcelKey, JSON.stringify(existingExcel));
            }
        }
    };
    
    const getExcel = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyExcelKey = `${emailKey}_${companyName}_Excel`; // Chave única para os Excel da empresa (corrigido)
            const excel = await AsyncStorage.getItem(companyExcelKey);
    
            console.log("Dados recuperados do AsyncStorage:", excel ? JSON.parse(excel) : []);
            return excel ? JSON.parse(excel) : [];
        }
        return [];
    };

    //Sessao para obter PGR, PCMSO e LTCAT
    
    const getPGR = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyPGRKey = `${emailKey}_${companyName}_PGRs`; // Chave única para os PGRs da empresa
            const pgrs = await AsyncStorage.getItem(companyPGRKey);
            return pgrs ? JSON.parse(pgrs) : [];
        }
        return [];
    };

    const getPCMSO = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; 
            const companyPCMSOKey = `${emailKey}_${companyName}_PCMSO`; 
            const pcmsos = await AsyncStorage.getItem(companyPCMSOKey);
            return pcmsos ? JSON.parse(pcmsos) : [];
        }
        return [];
    };

    const getLTCAT = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyLTCATKey = `${emailKey}_${companyName}_LTCAT`; // Chave única para os LTCATs da empresa
            const ltcats = await AsyncStorage.getItem(companyLTCATKey);
            return ltcats ? JSON.parse(ltcats) : [];
        }
        return [];
    };

    const getAPR = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyAPRKey = `${emailKey}_${companyName}_APR`; // Chave única para os APRs da empresa
            const aprs = await AsyncStorage.getItem(companyAPRKey);
            return aprs ? JSON.parse(aprs) : [];
        }
        return [];
    };

    const getOS = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyOSKey = `${emailKey}_${companyName}_OS`; // Chave única para as OSs da empresa
            const os = await AsyncStorage.getItem(companyOSKey);
            return os ? JSON.parse(os) : [];
        }
        return [];
    };

    const getPT = async (companyName) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyPTKey = `${emailKey}_${companyName}_PT`; // Chave única para os PTs da empresa
            const pt = await AsyncStorage.getItem(companyPTKey);
            return pt ? JSON.parse(pt) : [];
        }
        return [];
    };

    

    //Sessão para remover PGR, PCMSO e LTCAT

    const deletePGR = async (companyName, pgrTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyPGRKey = `${emailKey}_${companyName}_PGRs`; // Chave única para os PGRs da empresa
            const existingPGRs = JSON.parse(await AsyncStorage.getItem(companyPGRKey)) || [];
    
            // Filtra os PGRs para remover o PGR com o título especificado
            const updatedPGRs = existingPGRs.filter(pgr => pgr.titulo !== pgrTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyPGRKey, JSON.stringify(updatedPGRs));
        }
    };

    const deletePCMSO = async (companyName, pcmsoTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; 
            const companyPCMSOKey = `${emailKey}_${companyName}_PCMSO`; 
            const existingPCMSOs = JSON.parse(await AsyncStorage.getItem(companyPCMSOKey)) || [];
    
            
            const updatedPCMSOs = existingPCMSOs.filter(pcmso => pcmso.titulo !== pcmsoTitulo); 
            await AsyncStorage.setItem(companyPCMSOKey, JSON.stringify(updatedPCMSOs));
        }
    };

    const deleteLTCAT = async (companyName, ltcatTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyLTCATKey = `${emailKey}_${companyName}_LTCAT`; // Chave única para os LTCATs da empresa
            const existingLTCATs = JSON.parse(await AsyncStorage.getItem(companyLTCATKey)) || [];
    
            // Filtra os LTCATs para remover o LTCAT com o título especificado
            const updatedLTCATs = existingLTCATs.filter(ltcat => ltcat.titulo !== ltcatTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyLTCATKey, JSON.stringify(updatedLTCATs));
        }
    };

    const deleteAPR = async (companyName, aprTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyAPRKey = `${emailKey}_${companyName}_APR`; // Chave_UNIQUE para os APRs da empresa
            const existingAPRs = JSON.parse(await AsyncStorage.getItem(companyAPRKey)) || [];
    
            // Filtra os APRs para remover o APR com o titulo especificado
            const updatedAPRs = existingAPRs.filter(apr => apr.titulo !== aprTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyAPRKey, JSON.stringify(updatedAPRs));
        }
    };

    const deleteOS = async (companyName, osTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyOSKey = `${emailKey}_${companyName}_OS`; // Chave_UNIQUE para os OSs da empresa
            const existingOSs = JSON.parse(await AsyncStorage.getItem(companyOSKey)) || [];
    
            // Filtra os OSs para remover o OS com o titulo especificado
            const updatedOSs = existingOSs.filter(os => os.titulo !== osTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyOSKey, JSON.stringify(updatedOSs));
        }
    };

    const deletePT = async (companyName, ptTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
    
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyPTKey = `${emailKey}_${companyName}_PT`; // Chave_UNIQUE para os PTs da empresa
            const existingPTs = JSON.parse(await AsyncStorage.getItem(companyPTKey)) || [];
    
            // Filtra os PTs para remover o PT com o titulo especificado
            const updatedPTs = existingPTs.filter(pt => pt.titulo !== ptTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyPTKey, JSON.stringify(updatedPTs));
        }
    };

    const deleteExcel = async (companyName, excelTitulo) => {
        const storedUser = await AsyncStorage.getItem('user');
        const userData = storedUser ? JSON.parse(storedUser) : null;
        
        if (userData) {
            const emailKey = userData.email; // Usar email como chave
            const companyExcelKey = `${emailKey}_${companyName}_Excel`; // Chave_UNIQUE para os EXCELs da empresa
            const existingExcel = JSON.parse(await AsyncStorage.getItem(companyExcelKey)) || [];
    
            
            const updatedExcel = existingExcel.filter(excel => excel.titulo !== excelTitulo); // Alterado para filtrar pelo titulo
            await AsyncStorage.setItem(companyExcelKey, JSON.stringify(updatedExcel));

        }
    };
    
    


    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout, 
            register, 
            addCompany, 
            getCompanies, 
            deleteCompany, 
            deleteUserAccount, 
            addPGR, 
            getPGR, 
            deletePGR, 
            addPCMSO, 
            getPCMSO, 
            deletePCMSO, 
            addLTCAT, 
            getLTCAT, 
            deleteLTCAT,
            addAPR,
            getAPR,
            deleteAPR,
            addOS,
            getOS,
            deleteOS,
            addPT,
            getPT,
            deletePT,
            addExcel,
            getExcel,
            deleteExcel,
            }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;