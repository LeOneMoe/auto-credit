package stud.carcredit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
public class Car extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false) // name of the foreign key column
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Client client;

    @OneToOne(mappedBy = "car")
    private Loan loan;

    private String brand;


    private String model;

    private String number;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "day_of_purchase")
    private Date dateOfPurchase;

    @Column(name = "price")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;
}
