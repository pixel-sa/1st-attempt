import com.via.auth.*

class BootStrap {

    def init = { servletContext ->

//        def adminRole = Role.findOrSaveWhere(authority: "ROLE_ADMIN")
//
//        def user = User.findOrSaveWhere(username: "test@gmail.com" , password: "password", firstName: "Test",
//                lastName: "User", emailAddress: "test@gmail.com" )
//
//        if( !user.authorities.contains(adminRole)){
//            UserRole.create(user, adminRole, true)
//        }

    }
    def destroy = {
    }
}
