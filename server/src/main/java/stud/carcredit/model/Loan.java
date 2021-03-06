package stud.carcredit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "loans")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Loan extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id", nullable = false) // name of the foreign key column
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    @ToString.Exclude
    private Client client;

    @Column(name = "client_id", updatable = false, insertable = false)
    private Long clientId;

    @Column(name = "credit_number")
    private String creditNumber;

    @Column(name = "start_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    @JsonIgnore
    private Car car;

    @Column(name = "car_id", updatable = false, insertable = false)
    private Long carId;

    @Column(name = "total_sum")
    @Digits(integer = 10, fraction = 2)
    private BigDecimal totalSum;
}
