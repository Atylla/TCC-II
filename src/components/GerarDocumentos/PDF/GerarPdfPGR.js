import { Alert, PermissionsAndroid, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const gerarPdfPGR = async (companyName, pgrData) => {
  console.log('Iniciando a geração do PDF...');

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
          <h1>Programa de Gerenciamento de Riscos (PGR)</h1>
          <h1>${pgrData.titulo}</h1>
        </header>

        <main>
          <section>
            <h2>1. Introdução</h2>
            <p> Este documento estabelece o programa de gerenciamento de riscos (PGR) da ${companyName}. O objetivo do PGR é identificar, avaliar e gerenciar os riscos associados às atividades da empresa, promovendo um ambiente de trabalho seguro e saudável. </p>
          </section>

          <section>
            <h2>2. Objetivo do PGR</h2>
            <ul>
                <li>Identificar e avaliar os riscos presentes nas atividades da empresa.</li>
                <li>Estabelecer medidas de controle para minimizar ou eliminar os riscos.</li>
                <li>Garantir conformidade com a legislação vigente e normas de segurança.</li>
                <li>Promover a conscientização sobre segurança e saúde entre os colaboradores.</li>
            </ul>
          </section>

          <section>
            <h2>3. Escopo</h2>
            <p>Este PGR se aplica a todas as atividades (CNAE) realizadas por ${companyName}, Incluindo:</p>
            <p>${pgrData.cnae}</p>
        </section>

        <section>
            <h2>4. Identificação de Riscos</h2>
            <h3>4.1 Método de Identificação</h3>
            <p>Os riscos foram identificados através de:</p>
            <ul>
                <li>Inspeções de segurança.</li>
                <li>Avaliações de riscos.</li>
                <li>Relatórios de acidentes e quase-acidentes.</li>
                <li>Entrevistas com colaboradores.</li>
            </ul>

            <h3>4.2 Riscos Identificados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Atividade</th>
                        <th>Risco Identificado</th>
                        <th>Descrição do Risco</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${pgrData.atividade}</td>
                        <td>${pgrData.risco}</td>
                        <td>${pgrData.descricaoRisco}</td>
                        <td>${pgrData.categoria}</td>
                    </tr>

                </tbody>
            </table>
        </section>

        <section>
            <h2>5. Avaliação de Riscos</h2>
            <h3>5.1 Método de Avaliação</h3>
            <p>${pgrData.metodoAvaliacao}</p>

            <h3>5.2 Matriz de Riscos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Probabilidade</th>
                        <th>Consequências</th>
                        <th>Risco</th>
                        <th>Prioridade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${pgrData.probabilidade}</td>
                        <td>${pgrData.consequencias}</td>
                        <td>${pgrData.risco}</td>
                        <td>${pgrData.prioridade}</td>
                    </tr>

                </tbody>
            </table>
        </section>

        <section>
            <h2>6. Monitoramento e Revisão</h2>
            <p>O PGR será revisado anualmente e sempre que ocorrer uma mudança significativa nas operações ou após um acidente. O monitoramento das medidas de controle será realizado por meio de auditorias periódicas.</p>
        </section>

        <section>
            <h2>7. Registros e Documentação</h2>
            <p>Todos os registros relacionados ao PGR, incluindo avaliações de risco, treinamentos realizados e auditorias, serão mantidos pelo período de [definir período] e estarão disponíveis para consulta.</p>
        </section>

        <section>
            <h2>8. Considerações Finais</h2>
            <p>A segurança e saúde de todos os colaboradores é prioridade para [Nome da Empresa]. A adesão ao PGR é essencial para garantir um ambiente de trabalho seguro e saudável.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy;  ${companyName}. Todos os direitos reservados.</p>
    </footer>


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

export default gerarPdfPGR;
