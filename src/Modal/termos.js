import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TermosUso() {
    const navigation = useNavigation();

    const handleResetPassword = () => {
        navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Termos de Uso do Aplicativo GAIA</Text>
                <Text style={styles.subtitle}>1. Aceitação dos Termos</Text>
                <Text style={styles.text}>Bem-vindo ao aplicativo GAIA. Ao acessar e usar nosso aplicativo, você concorda em cumprir e estar sujeito aos seguintes Termos de Uso. Se você não concorda com estes termos, por favor, não use o aplicativo.</Text>
                <Text style={styles.subtitle}>2. Descrição do Serviço</Text>
                <Text style={styles.text}>O aplicativo GAIA é uma plataforma que [descrição do que o aplicativo faz]. A GAIA se reserva o direito de modificar, suspender ou descontinuar o serviço, com ou sem aviso, a qualquer momento.</Text>
                <Text style={styles.subtitle}>3. Registro e Conta do Usuáriod</Text>
                <Text style={styles.text}>Para utilizar certos recursos do aplicativo, você deve se registrar e criar uma conta. Você concorda em fornecer informações verdadeiras, precisas e completas sobre você conforme solicitado pelo formulário de registro do aplicativo. Você é responsável por manter a confidencialidade de sua senha e conta e por todas as atividades que ocorrem em sua conta.
                </Text>
                <Text style={styles.subtitle}>4. Uso do Aplicativod</Text>
                <Text style={styles.text}>Você concorda em usar o aplicativo apenas para fins legais e de acordo com os Termos de Uso. Você não deve:{"\n"}
                    - Usar o aplicativo de qualquer maneira que possa danificar, desativar, sobrecarregar ou prejudicar o serviço.{"\n"}
                    - Tentar obter acesso não autorizado a qualquer parte do aplicativo.{"\n"}
                    - Usar o aplicativo para qualquer finalidade ilegal ou não autorizada.
                </Text>
                <Text style={styles.subtitle}>5. Conteúdo do Usuáriod</Text>
                <Text style={styles.text}>Você pode enviar, postar ou de outra forma disponibilizar conteúdo através do aplicativo (o "Conteúdo do Usuário"). Você é o único responsável por seu Conteúdo do Usuário e pelas consequências de postá-lo ou publicá-lo. Ao enviar Conteúdo do Usuário, você concede à GAIA uma licença não exclusiva, mundial, livre de royalties, sublicenciável e transferível para usar, reproduzir, distribuir, preparar trabalhos derivados, exibir e executar o Conteúdo do Usuário em conexão com o serviço.</Text>
                <Text style={styles.subtitle}>6. Propriedade Intelectuald</Text>
                <Text style={styles.text}>Todo o conteúdo e materiais disponíveis no aplicativo, incluindo, mas não se limitando a, texto, gráficos, nome do aplicativo, código, imagens e logotipos são de propriedade da GAIA e estão protegidos pelas leis de direitos autorais e outras leis de propriedade intelectual.
                </Text>
                <Text style={styles.subtitle}>7. Privacidade</Text>
                <Text style={styles.text}>Sua privacidade é importante para nós. Nossa Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais.</Text>
                <Text style={styles.subtitle}>8. Limitação de Responsabilidade</Text>
                <Text style={styles.text}>Em nenhuma circunstância a GAIA será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes do uso ou da incapacidade de usar o aplicativo, mesmo que a GAIA tenha sido avisada da possibilidade de tais danos.</Text>
                <Text style={styles.subtitle}>9. Modificações nos Termos de Uso</Text>
                <Text style={styles.text}>A GAIA se reserva o direito de modificar estes Termos de Uso a qualquer momento. Quaisquer alterações serão publicadas nesta página e, se as mudanças forem significativas, forneceremos um aviso mais destacado. Seu uso continuado do aplicativo após tais modificações constitui sua aceitação dos novos Termos de Uso.</Text>
                <Text style={styles.subtitle}>10. Rescisão</Text>
                <Text style={styles.text}>Podemos rescindir ou suspender seu acesso ao aplicativo imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar os Termos de Uso.</Text>
                <Text style={styles.subtitle}>11. Lei Aplicável</Text>
                <Text style={styles.text}>Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil, sem consideração a seus conflitos de princípios legais.
                </Text>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 8,
        textAlign: 'justify'
    },
    text: {
        fontSize: 12,
        textAlign: 'justify',
    },
});
