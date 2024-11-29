import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfOS = async (companyName, osData) => {
  console.log('Iniciando a geração do PDF para o OS...');

  // Função para solicitar permissão de armazenamento (apenas para Android)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão de Armazenamento',
          message: 'Este aplicativo precisa de permissão para acessar o armazenamento.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert('Permissão de armazenamento negada.');
    return;
  }

  // Gera o conteúdo HTML para o PDF
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #008000; }
          h2 { color: #005500; }
          .section-title { font-size: 18px; color: #333; margin-top: 20px; }
          .content { margin-bottom: 10px; font-size: 14px; }
          table {
            width: 100%;
            border-collapse: collapse;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
      </head>
      <body>
        <header>
          <h1>Ordem de Serviço (OS)</h1>
          <h1>${osData.titulo}</h1>
        </header>
        <main>
          <section>
            <h2>Funcionário</h2>
            <p>Nome: ${osData.nomeFuncionario}</p>
            <p>Função: ${osData.funcao}</p>
            <p>Empresa: ${companyName}</p>
            <p>CNPJ: ${osData.cnpj}</p>
          </section>

          <section>
            <h2>Atividades</h2>
            <p>${osData.atividade1}</p>
            <p>${osData.atividade2}</p>
          </section>

          <section>
            <h2>Risco e Avaliação</h2>
            <p>Fisico: ${osData.fisico}</p>
            <p>Quimico: ${osData.quimico}</p>
            <p>Biologico: ${osData.biologico}</p>
            <p>Ergonomico: ${osData.ergonomico}</p>
            <p>Acidentes: ${osData.acidentes}</p>
          </section>

          <section>
            <h2>EPIs Necessários</h2>
            <p>${osData.epi1}</p>
            <p>${osData.epi2}</p>
            <p>${osData.epi3}</p>
          </section>

          <section>
            <h2>Medidas Preventivas para os Riscos</h2>
            <p>${osData.medidas1}</p>
            <p>${osData.medidas2}</p>
          </section>
          <section>
            <h2>Orientações de Segurança do Trabalho</h2>
            <p>${osData.orientacoe}</p>
          </section>
          <section>
            <h2>Conclusão</h2>
            <p>Declaro que possuo treinamento de segurança e saúde no trabalho, bem com todos os equipamentos de proteção individual para neutralizar a ação dos agentes nocivos presentes no meu ambiente de trabalho. Serei cobrado, conforme amparo legal com relação ao uso destes equipamentos e estou ciente de que a  não utilização é passível de Sansões Legais.</p>
          </section>
          <section>
            <h2>Assinatura do Funcionário</h2>
            <p>______________________________________________</p>
          </section>

        </main>
      </body>
    </html>
  `;

  try {
    // Gerar o arquivo PDF usando o conteúdo HTML
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    console.log('Arquivo gerado em:', uri);

    // Compartilhar o arquivo PDF, se possível
    if (Platform.OS !== 'web' && await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
      Alert.alert('PDF gerado e compartilhado com sucesso!');
    } else {
      Alert.alert('PDF gerado com sucesso!', `Local do arquivo: ${uri}`);
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    Alert.alert('Erro ao gerar PDF', error.message);
  }
};

export default gerarPdfOS;