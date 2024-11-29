import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';
import { Alert } from 'react-native';




const gerarExcel = async (companyName, excelData) => {

    const data = [
        [`${excelData.titulo}`],
        ['Periodo do relatório', 'Empresa', 'CNPJ', 'Nome Fantasia'], 
        [excelData.periodo, companyName,excelData.cnpj,excelData.fantasia],
        [],
        ['Inspeção:'],
        ['Data da inspeção', 'Setor', 'Condições encontradas', 'Riscos Identificados', 'Ação corretiva'],
        [excelData.data,excelData.setor,excelData.condicoes,excelData.riscos,excelData.acoes],
        [],
        ['Treinamento:'],
        ['Data do Treinamento', 'Tipo de Treinamento', 'Equipe', 'Quantidade de Participantes'], 
        [excelData.datatreino, excelData.tipotreino, excelData.equipe, excelData.nparticipantes],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);


    // Ajustando a largura das colunas (opcional)
    const colWidths = [
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 },
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 }, 
        { wch: 20 },  
    ];
    worksheet['!cols'] = colWidths;

    // Criando o livro Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${excelData.titulo}`);

    // Convertendo para base64
    const excelBinary = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
    const filePath = FileSystem.cacheDirectory + `${excelData.titulo}` + '.xlsx';

    try {
        await FileSystem.writeAsStringAsync(filePath, excelBinary, {
            encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(filePath);
        Alert.alert("Arquivo Excel compartilhado com sucesso!");
    } catch (error) {
        console.error("Erro ao compartilhar o arquivo Excel:", error);
        Alert.alert("Erro ao compartilhar o arquivo Excel.");
    }
};

export default gerarExcel;