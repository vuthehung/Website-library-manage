package com.hugdev.ManageLibary;

import com.hugdev.ManageLibary.user.User;
import com.hugdev.ManageLibary.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
	@Autowired
	private UserRepository repo;

	@Test
	public void testAddNew() {
		User user = new User();
		user.setEmail("alex.stevenson.hug@gmail.com");
		user.setPassword("alex1234567");
		user.setFirstName("AlexHug");
		user.setLastName("Stevenson");

		User savedUser = repo.save(user);

		Assertions.assertThat(savedUser).isNotNull();
		Assertions.assertThat(savedUser.getId()).isGreaterThan(0);
	}
	@Test
	public void testListUsers() {
		Iterable<User> users = repo.findAll();
		Assertions.assertThat(users).hasSizeGreaterThan(0);

		for (User user : users) {
			System.out.println(user);
		}
	}

	@Test
	public void testUpdateUser() {
		Integer userId = 1;
		Optional<User> optionalUser = repo.findById(userId);
		User user = optionalUser.get();
		user.setPassword("hahn.han02");
		repo.save(user);

		User updateUser = repo.findById(userId).get();
		Assertions.assertThat(updateUser.getPassword()).isEqualTo("hahn.han02");
	}
}
