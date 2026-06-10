import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  static const String baseUrl = 'http://localhost:5000/api';
  
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  
  // ==================== EMAIL VERIFICATION ====================
  
  /// E-posta ile kayıt ve OTP gönderme
  Future<Map<String, dynamic>> registerWithEmail({
    required String email,
    required String firstName,
    required String lastName,
    required String phone,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register/email'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'first_name': firstName,
          'last_name': lastName,
          'phone': phone,
        }),
      );
      
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP e-postaya gönderildi',
          'email': email,
          'data': jsonDecode(response.body),
        };
      } else {
        throw Exception('Registration failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  /// E-posta OTP doğrulama
  Future<Map<String, dynamic>> verifyEmailOTP({
    required String email,
    required String otp,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/verify/email-otp'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'otp': otp,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'token': data['token'],
          'user': data['user'],
          'message': 'E-posta başarıyla doğrulandı',
        };
      } else {
        throw Exception('OTP verification failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  // ==================== PHONE VERIFICATION ====================
  
  /// Telefon numarası ile kayıt ve SMS OTP gönderme
  Future<Map<String, dynamic>> registerWithPhone({
    required String phoneNumber,
    required String firstName,
    required String lastName,
    required String email,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register/phone'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'phone': phoneNumber,
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
        }),
      );
      
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP SMS\'le gönderildi',
          'phone': phoneNumber,
          'data': jsonDecode(response.body),
        };
      } else {
        throw Exception('Registration failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  /// Telefon OTP doğrulama
  Future<Map<String, dynamic>> verifySmsOTP({
    required String phoneNumber,
    required String otp,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/verify/sms-otp'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'phone': phoneNumber,
          'otp': otp,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'token': data['token'],
          'user': data['user'],
          'message': 'Telefon başarıyla doğrulandı',
        };
      } else {
        throw Exception('OTP verification failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  /// OTP yeniden gönder
  Future<Map<String, dynamic>> resendOTP({
    required String identifier,
    required String type,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/resend-otp'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'identifier': identifier,
          'type': type,
        }),
      );
      
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP yeniden gönderildi',
        };
      } else {
        throw Exception('Resend failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  // ==================== GOOGLE SIGN-IN ====================
  
  /// Google ile kayıt/giriş
  Future<Map<String, dynamic>> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      
      if (googleUser == null) {
        return {
          'success': false,
          'message': 'Google giriş iptal edildi',
        };
      }
      
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );
      
      final userCredential = await _firebaseAuth.signInWithCredential(credential);
      
      final response = await http.post(
        Uri.parse('$baseUrl/auth/google'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'google_id': userCredential.user?.uid,
          'email': userCredential.user?.email,
          'first_name': userCredential.user?.displayName?.split(' ').first,
          'last_name': userCredential.user?.displayName?.split(' ').skip(1).join(' '),
          'profile_picture_url': userCredential.user?.photoURL,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'token': data['token'],
          'user': data['user'],
          'message': 'Google ile başarıyla giriş yapıldı',
        };
      } else {
        throw Exception('Backend registration failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Google giriş hatası: $e',
      };
    }
  }
  
  /// Google ile çıkış yap
  Future<void> signOutGoogle() async {
    await _googleSignIn.signOut();
    await _firebaseAuth.signOut();
  }
  
  // ==================== LOGIN ====================
  
  /// E-posta ve OTP ile giriş
  Future<Map<String, dynamic>> loginWithEmail({
    required String email,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login/email'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email}),
      );
      
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP e-postaya gönderildi',
          'email': email,
        };
      } else {
        throw Exception('Login failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  /// Telefon ve OTP ile giriş
  Future<Map<String, dynamic>> loginWithPhone({
    required String phoneNumber,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login/phone'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'phone': phoneNumber}),
      );
      
      if (response.statusCode == 200) {
        return {
          'success': true,
          'message': 'OTP SMS\'le gönderildi',
          'phone': phoneNumber,
        };
      } else {
        throw Exception('Login failed: ${response.body}');
      }
    } catch (e) {
      return {
        'success': false,
        'message': 'Error: $e',
      };
    }
  }
  
  // ==================== LOGOUT ====================
  
  Future<void> logout() async {
    await _firebaseAuth.signOut();
    await _googleSignIn.signOut();
  }
  
  // ==================== HELPER METHODS ====================
  
  Future<String?> getStoredToken() async {
    final user = _firebaseAuth.currentUser;
    if (user != null) {
      return await user.getIdToken();
    }
    return null;
  }
  
  User? getCurrentUser() {
    return _firebaseAuth.currentUser;
  }
  
  Stream<User?> authStateChanges() {
    return _firebaseAuth.authStateChanges();
  }
}