package dev.Reyes.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="account")
public class Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="account_id")
    private Integer account_id;

    @Column(name="f_name")
    private String f_name;

    @Column(name="l_name")
    private String l_name;

    @Column(name="email", unique = true, nullable = false)
    private String email;

    @Column(name="password", nullable = false)
    private String password;

    public Account() {
    }

    public Account(Integer account_id, String fName, String lName, String email, String password){
        this.account_id = account_id;
        this.f_name = fName;
        this.l_name = lName;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "Account{" +
                "account_id=" + account_id +
                ", f_name='" + f_name + '\'' +
                ", l_name='" + l_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
