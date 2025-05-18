class User {
  // TODO: сделать поля приватными с геттерами
  // ! сеттеры будут только посредством работы репозиториев

  // TODO: подумать над тем, не много ли полей для переменной пользователя? 
  // ! думаю, что много.

  final String userId;
  final String userName;
  final String userLogin;
  final String userEmail;
  final String userPhone;
  final String userHashPassword;

  Map<String, dynamic> toJson() => {
        'id_user': userId,
        'name': userName,
        'email': userEmail,
        'phone': userPhone,
        'hashPassword': userHashPassword
      };
  
  Map<String, dynamic> getPosts() => {
    // сделать логику получения запросов
    // ! ощущение, что это тут лишнее
  };

  User(this.userId, this.userName, this.userLogin, this.userEmail, this.userPhone, this.userHashPassword);
}
