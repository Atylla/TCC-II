import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfPCMSO = async (companyName, pcmsoData) => {
  console.log('Iniciando a geração do PDF para o PCMSO...');

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
        </style>
      </head>
      <body>
        <header>
          <h1>Programa de Controle Médico de Saúde Ocupacional (PCMSO)</h1>
          <h1>${pcmsoData.titulo}</h1>
        </header>

        <main>
          <section>
            <h2>Planejamento e Execução do PCMSO</h2>
            <p>Este documento estabelece o plano de controle médico e de saúde ocupacional da ${companyName}.</p>
          </section>

          <section>
            <h2>Riscos</h2>
            <h3>Riscos Físicos</h3>
            <p>${pcmsoData.riscoFisico}</p>
            <h3>Riscos Químicos</h3>
            <p>${pcmsoData.riscoQuimico}</p>
            <h3>Riscos Biológicos</h3>
            <p>${pcmsoData.riscoBiologico}</p>
            <h3>Riscos Ergonômicos</h3>
            <p>${pcmsoData.riscoErgonomico}</p>
          </section>

          <section>
            <h2>Exames e Equipamentos de Proteção Individual</h2>
            <h3>Exame</h3>
            <p>${pcmsoData.exame}</p>
            <h3>EPIs</h3>
            <p>${pcmsoData.epis}</p>
          </section>

          <section>
            <h2>Treinamentos</h2>
            <p>${pcmsoData.treinamento}</p>
          </section>

          <footer>
            <p>&copy; ${companyName}. Todos os direitos reservados.</p>
          </footer>
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

export default gerarPdfPCMSO;
