import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfAPR = async (companyName, aprData) => {
  console.log('Iniciando a geração do PDF para o APR...');

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
          <h1>Analise Preliminar de Risco (APR)</h1>
          <h1>${aprData.titulo}</h1>
        </header>

        <main>
          <section>
            <h2>Identificação da Empresa</h2>
            <p>Nome: ${aprData.fantasia}</p>
            <p>CNPJ: ${aprData.cnpj}</p>
            <p>Ramo de Atividade: ${aprData.ramoAtividade}</p>
          </section>

          <section>
            <h2>Identificação dos Riscos</h2>
            <table>
              <thead>
                <tr>
                  <th>Risco Identificado</th>
                  <th>Descrição do Risco</th>
                  <th>Consequencias Potenciais</th>
                  <th>Probabilidade</th>
                  <th>Severidade</th>
                  <th>Classificação</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${aprData.riscoIdentificado}</td>
                  <td>${aprData.descricaoRisco}</td>
                  <td>${aprData.consequencias}</td>
                  <td>${aprData.probabilidade}</td>
                  <td>${aprData.severidade}</td>
                  <td>${aprData.classificacao}</td>
                </tr>
                <tr>
                  <td>${aprData.riscoIdentificado2}</td>
                  <td>${aprData.descricaoRisco2}</td>
                  <td>${aprData.consequencias2}</td>
                  <td>${aprData.probabilidade2}</td>
                  <td>${aprData.severidade2}</td>
                  <td>${aprData.classificacao2}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section>
            <h2>Equipamentos de Proteção Individual Necessarios:</h2>
            <p>${aprData.equipamentos}</p>
            <p>${aprData.equipamentos2}</p>
          </section>
          <section>
            <h2>Condições de Trabalho</h2>
            <p>Ambiente de Trabalho: ${aprData.ambienteTrabalho}</p>
            <p>Sinalização: ${aprData.sinalizacao}</p>
            <p>Treinamentos Necessários: ${aprData.treinamentos}</p>
          </section>
          <section>
            <h2>Conclusão</h2>
            <p></p>
          </section>
          <section>
            <p>Assinatura do Responsavel</p>
            <p>___________________________________________</p>
            <p>Data da Aprovação:____/____/____<p>
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

export default gerarPdfAPR;