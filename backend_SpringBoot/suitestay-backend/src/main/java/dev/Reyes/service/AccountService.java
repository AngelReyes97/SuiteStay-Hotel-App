package dev.Reyes.service;

import dev.Reyes.entity.Account;
import dev.Reyes.repository.AccountRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder){
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account registerUser(Account newUser){
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return accountRepository.save(newUser);
    }

    public Account findByEmail(String email){
        return accountRepository.findByEmail(email);
    }

}
