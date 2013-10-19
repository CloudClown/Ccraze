var ref = new Firebase("https://ccraze.firebaseio.com");

// global user (is this a good thing?)
myUser = -1;

function addUser(email, password){
  authClient.createUser(email, password, function (error, user) {
    if (!error) {
      console.log('logging new registered user');
      doLogin(email, password);
      $("#register-form").hide();
      setTimeout("location.href = '/';",1000);
    } else {
      alert(error);
    }
  });
}

function doLogin(email, password) {
  authClient.login('password', {
    email: email,
    password: password
  });
};

$(function () {
    $("#register-submit").click(function (e) {
    var email = $("#register-email").val();
    var password = $("#register-password").val();
    addUser(email, password);
  });

  $("#login-submit").click(function (e) {
    e.preventDefault();
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    if (doLogin(email, password)) {
      setTimeout("location.href = '/user';",500);
    }
  });

  $("#opener-logout").click(function () {
    authClient.logout();
    location.href = "/";
  });
});

var authClient = new FirebaseSimpleLogin(ref, function (error, user) {
  if (error) {
    alert(error);
    return;
  }
  if (user) {
    if ($('#login-email').length > 0) {
      location.href = '/user';
    }
    // User is already logged in.
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    myUser = user;
    // doLogin(user);
    console.log('logged in')
  } else {
    // User is logged out.
    console.log('logged out');
  }
});
