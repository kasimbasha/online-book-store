package in.kasimbasha.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import in.kasimbasha.onlinebookstore.entity.Book;

@CrossOrigin("http://localhost:4200")
public interface BookRepository extends JpaRepository<Book, Long>{

}
