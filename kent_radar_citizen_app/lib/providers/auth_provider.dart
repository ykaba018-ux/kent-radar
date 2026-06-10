import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  final AuthService authService;
  
  bool isLoading = false;
  String? errorMessage;
  String? successMessage;
  
  String? pendingEmail;
  String? pendingPhone;
  String? verificationId;
  
  AuthProvider(this.authService);
  
  // ==================== EMAIL REGISTRATION ====================
  Future<bool> registerWithEmail({
    required String email,
    required String firstName,
    required String lastName,
    required String phone,
  }) async {
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.registerWithEmail(
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      );
      
      if (result['success']) {
        pendingEmail = email;
        successMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // ==================== EMAIL OTP VERIFICATION ====================
  Future<bool> verifyEmailOTP(String otp) async {
    if (pendingEmail == null) {
      errorMessage = 'E-posta bilgisi bulunamadı';
      notifyListeners();
      return false;
    }
    
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.verifyEmailOTP(
        email: pendingEmail!,
        otp: otp,
      );
      
      if (result['success']) {
        successMessage = result['message'];
        pendingEmail = null;
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // ==================== PHONE REGISTRATION ====================
  Future<bool> registerWithPhone({
    required String phoneNumber,
    required String firstName,
    required String lastName,
    required String email,
  }) async {
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.registerWithPhone(
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        email: email,
      );
      
      if (result['success']) {
        pendingPhone = phoneNumber;
        successMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // ==================== SMS OTP VERIFICATION ====================
  Future<bool> verifySmsOTP(String otp) async {
    if (pendingPhone == null) {
      errorMessage = 'Telefon bilgisi bulunamadı';
      notifyListeners();
      return false;
    }
    
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.verifySmsOTP(
        phoneNumber: pendingPhone!,
        otp: otp,
      );
      
      if (result['success']) {
        successMessage = result['message'];
        pendingPhone = null;
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // ==================== RESEND OTP ====================
  Future<bool> resendOTP({
    required String identifier,
    required String type,
  }) async {
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.resendOTP(
        identifier: identifier,
        type: type,
      );
      
      if (result['success']) {
        successMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // ==================== GOOGLE SIGN-IN ====================
  Future<bool> signInWithGoogle() async {
    try {
      isLoading = true;
      errorMessage = null;
      notifyListeners();
      
      final result = await authService.signInWithGoogle();
      
      if (result['success']) {
        successMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return true;
      } else {
        errorMessage = result['message'];
        isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      errorMessage = 'Hata: $e';
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  void clearMessages() {
    errorMessage = null;
    successMessage = null;
    notifyListeners();
  }
}