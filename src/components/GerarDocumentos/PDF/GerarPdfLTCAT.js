import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfLTCAT = async (companyName, ltcatData) => {
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
          <h1>Laudo Técnico das Condições Ambientais de Trabalho (LTCAT)</h1>
          <h1>${ltcatData.titulo}</h1>
        </header>

        <main>
          <section>
            <h2>Identificação da Empresa</h2>
            <p>Nome: ${ltcatData.fantasia}</p>
            <p>CNPJ: ${ltcatData.cnpj}</p>
            <p>Ramo de Atividade: ${ltcatData.ramoAtividade}</p>
          </section>

          <section>
            <h2>Dados do Ambiente de Trabalho</h2>
            <p>Setor: ${ltcatData.setor}</p>
            <p>Descrição das Atividades: ${ltcatData.descricaoAtividade}</p>
            <P>Equipamentos Utilizados: ${ltcatData.equipamento}</P>
          </section>

          <section>
            <h2>Análise das Condições Ambientais</h2>
            <table>
                <tr>
                    <th>Agente Nocivo</th>
                    <th>Intensidade</th>
                    <th>Classe de Risco</th>
                    <th>EPI Usado</th>
                    <th>Observações</th>
                </tr>
                <tr>
                    <td>${ltcatData.agenteNocivo}</td>
                    <td>${ltcatData.intensidade}</td>
                    <td>${ltcatData.classeRisco}</td>
                    <td>${ltcatData.epiUsado}</td>
                    <td>${ltcatData.observacoes}</td>
                </tr>
                <tr>
                    <td>${ltcatData.agenteNocivo1}</td>
                    <td>${ltcatData.intensidade1}</td>
                    <td>${ltcatData.classeRisco1}</td>
                    <td>${ltcatData.epiUsado1}</td>
                    <td>${ltcatData.observacoes1}</td>
                </tr>
            </table>
          </section>
          <section>
            <h2>Conclusão</h2>
            <p> A análise técnica realizada no ambiente de trabalho do setor ${ltcatData.setor} evidenciou a exposição aos seguintes agentes nocivos: ${ltcatData.agenteNocivo}. Em função das condições observadas, os trabalhadores estão expostos a intensidade de ${ltcatData.intensidade} e a classe de risco ${ltcatData.classeRisco}, sendo recomendada a utilização de ${ltcatData.epiUsado}.</p>
            <p>Data da Análise: ${ltcatData.data}</p>
          </section>

          <section>
            <p>Assinatura do Responsável Tecnico:</p>
            <p>_________________________________________</p>
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

export default gerarPdfLTCAT;