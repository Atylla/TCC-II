import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfPT = async (companyName, ptData) => {
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
          <h1>Permissão de Trabalho (PT)</h1>
          <h1>${ptData.titulo}</h1>
        </header>
        <main>
          <section>
            <h2>Serviço</h2>
            <p>Empresa: ${companyName}</p>
            <p>CNPJ: ${ptData.cnpj}</p>
            <P>Setor: ${ptData.setor}</P>
            <p>Data de Inicio: ${ptData.dataInicio}</p>
            <p>Data de Fim: ${ptData.dataFim}</p>
            <p>Equipe: ${ptData.equipe}</p>
          </section>

          <section>
            <h2>Descrição do Serviço</h2>
            <p>${ptData.descricaoServico}</p>
          </section>

          <section>
            <h2>Riscos Identificados e Medidas de Controle</h2>
            <p>Riscos: ${ptData.riscos}</p>
            <p>Medidas de Controle: ${ptData.medidasControle}</p>
          </section>
          <section>
            <h2>Equipamentos Necessários</h2>
            <p>Equipamentos: ${ptData.equipamentos}</p>
          </section>

          <section>
            <h2>Autorizações e Aprovações</h2>
            <p>Supervisor: </P>
            <p> -Nome:______________________________</P>
            <p> -Assinatura:__________________________</P>
            <p> -Data:______________________________</P>
            <p>Responsável pela área: </P>
            <p> -Nome:______________________________</P>
            <p> -Assinatura:__________________________</P>
            <p> -Data:______________________________</P>
            <p>Responsável pela segurança do trabalho: </P>
            <p> -Nome:______________________________</P>
            <p> -Assinatura:__________________________</P>
            <p> -Data:______________________________</P>
          </section>

          <section>
            <h2>Declaração de Conformidade</h2>
            <p> Declaro que todas as medidas de segurança e controle foram implementadas e que o trabalho será executado em conformidade com as normas de segurança e saúde ocupacional. </P>
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

export default gerarPdfPT;