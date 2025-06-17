import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // ========== BASE STYLES ==========
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F8FBFF',
  },
  patientContainer: {
    paddingBottom: 40,
  },

  // ========== HEADER STYLES ==========
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1FB',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ========== CARD STYLES ==========
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    marginBottom: 20,
    shadowColor: '#3E7BFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDF4FF',
  },

  // ========== TYPOGRAPHY ==========
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A2463',
    marginBottom: 16,
  },
  itemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#1E3A8A',
  },
  itemSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  emptyMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 24,
  },
  loginTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#0A2463',
    textAlign: 'center',
    marginBottom: 40,
  },

  // ========== FORM ELEMENTS ==========
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1EBFA',
    height: 56,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E3A8A',
    paddingVertical: 0,
  },
  inputBusca: {
    flex: 1,
    height: 40,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E3A8A',
    paddingHorizontal: 12,
  },

  // ========== BUTTON STYLES ==========
  primaryButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#E3EEFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  actionButton: {
    backgroundColor: '#3E7BFA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },

  // ========== CHART STYLES ==========
  graficoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  // ========== LIST STYLES ==========
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF4FF',
  },
  itemPaciente: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#EDF4FF',
  },

  // ========== MEDICAL VALUES ==========
  medicaoValor: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#10B981',
  },
  medicaoAlta: {
    color: '#EF4444',
  },
  medicaoBaixa: {
    color: '#F59E0B',
  },

  // ========== MODAL STYLES ==========
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(10, 36, 99, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#0A2463',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#F8FBFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E1EBFA',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E3A8A',
    marginBottom: 24,
  },
  modalButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  modalButtonPrimary: {
    backgroundColor: '#3E7BFA',
  },
  modalButtonSecondary: {
    backgroundColor: '#E2E8F0',
  },
  modalButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalButtonTextSecondary: {
    color: '#64748B',
  },

  // ========== SPECIAL ELEMENTS ==========
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#3E7BFA',
    fontSize: 20,
  },
  dateBadge: {
    backgroundColor: '#E3EEFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  dateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#3E7BFA',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  buscaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    margin: 24,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#E1EBFA',
  },
  nomePaciente: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0A2463',
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  comingSoonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#3E7BFA',
    marginTop: 24,
  },
  comingSoonSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },

  // ========== ADMIN CARD STYLES ==========
  cardPrimary: {
    backgroundColor: '#3E7BFA',
  },
  cardSecondary: {
    backgroundColor: '#10B981',
  },
  cardTertiary: {
    backgroundColor: '#F59E0B',
  },
  cardQuaternary: {
    backgroundColor: '#8B5CF6',
  },
  cardText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 12,
  },
});