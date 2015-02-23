package Evive.respository;

import Evive.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String>{
    public User findByEmailIdAndPassword(String emailId,String password);
}
