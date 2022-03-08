create table summits
(
    id        int auto_increment,
    mainland  varchar(45) null,
    latitude  int         null,
    longitude int         null,
    height    int         null,
    constraint Id_UNIQUE
        unique (id)
);

alter table summits
    add primary key (id);

create table summit_alps
(
    id          int auto_increment
        primary key,
    summit_id   int                       not null,
    last_name   varchar(45)               not null,
    first_name  varchar(45)               not null,
    middle_name varchar(45)               null,
    ascent_date date default '2021-03-21' not null,
    constraint `picks _main_id`
        foreign key (summit_id) references summits (id)
            on update cascade on delete cascade
);

create index picks_id_idx
    on summit_alps (summit_id);

create table summit_names
(
    id          int auto_increment,
    summit_id   int         not null,
    summit_name varchar(45) not null,
    constraint summit_names_id_UNIQUE
        unique (id),
    constraint summit_names_summit_name_uindex
        unique (summit_name),
    constraint picks_id
        foreign key (summit_id) references summits (id)
            on update cascade on delete cascade
);

create index picks_id_idx
    on summit_names (summit_id);

alter table summit_names
    add primary key (id);

create
definer = root@localhost procedure addNewSummit(IN sum_mainland varchar(45), IN sum_latitude int,
                                                    IN sum_longitude int, IN sum_height int)
BEGIN
INSERT INTO `stud`.`summits`
(`mainland`, `latitude`, `longitude`, `height`)
VALUES (sum_mainland, sum_latitude, sum_longitude, sum_height);

Select LAST_INSERT_ID();
END;

create
definer = root@localhost procedure addNewSummitAlp(IN sum_id int, IN alp_fn varchar(45), IN alp_ln varchar(45),
                                                       IN alp_mn varchar(45), IN alp_ad date)
BEGIN
IF (DATE(alp_ad) = '0000-00-00') THEN
SET alp_ad = now();
END IF;

IF (EXISTS(SELECT `id` FROM `stud`.`summits` WHERE `id` = sum_id LIMIT 1)) THEN
        IF (NOT EXISTS(SELECT `id`
                       FROM `stud`.`summit_alps`
                       WHERE `first_name` = alp_fn
                         AND `last_name` = alp_ln
                         AND `middle_name` = alp_mn
                         AND `summit_id` = sum_id
                       LIMIT 1)) THEN
INSERT INTO `stud`.`summit_alps`
(`summit_id`, `first_name`, `last_name`, `middle_name`, `ascent_date`)
VALUES (sum_id, alp_fn, alp_ln, alp_mn, alp_ad);
ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS ALP FOR CURRENT SUMMIT ALREADY EXIST';
END If;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT ID DO NOT EXISTS';
END IF;

Select LAST_INSERT_ID();
END;

create
definer = root@localhost procedure addNewSummitName(IN sum_id int, IN sum_name varchar(45))
BEGIN
IF (EXISTS(SELECT `id` From `stud`.`summits` Where `id` = sum_id LIMIT 1)) Then
        IF (NOT EXISTS(SELECT `summit_id` From `stud`.`summit_names` Where `summit_name` = sum_name LIMIT 1)) THEN
INSERT INTO `stud`.`summit_names`
(`summit_id`, `summit_name`)
VALUES (sum_id, sum_name);
ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT NAME ALREADY EXISTS';
END IF;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT ID DO NOT EXISTS';
End IF;

Select LAST_INSERT_ID();
END;

create
definer = root@localhost procedure deleteSummitAlpByFIO(IN alp_id int)
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summit_alps` WHERE `id` = alp_id LIMIT 1)) THEN
DELETE FROM `stud`.`summit_alps` WHERE `id` = alp_id;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS ALPINIST DO NOT EXISTS';
END IF;

Select alp_id;
END;

create
definer = root@localhost procedure deleteSummitById(IN sum_id int)
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summits` WHERE `id` = sum_id LIMIT 1)) Then
DELETE FROM `stud`.`summits` WHERE `id` = sum_id;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SUMMIT WITH THIS ID DO NOT EXISTS';
END IF;

Select sum_id;
END;

create
definer = root@localhost procedure deleteSummitName(IN sum_name varchar(45))
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summit_names` WHERE `summit_name` = sum_name LIMIT 1)) THEN
DELETE FROM `stud`.`summit_names` WHERE `summit_name` = sum_name;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT NAME DO NOT EXISTS';
END IF;

Select 'Success';
END;

create
definer = root@localhost procedure getAllSummits()
BEGIN
SELECT * FROM `stud`.`summits`;
END;

create
definer = root@localhost procedure getSummitAlpsBySummitId(IN id int)
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summit_alps` WHERE `summit_id` = id LIMIT 1)) Then
Select * From `stud`.`summit_alps` Where `summit_id` = id;
Else
Select null;
END IF;
END;

create
definer = root@localhost procedure getSummitByName(IN Name varchar(45))
BEGIN
DECLARE summit_id INT DEFAULT (0);
SELECT `id` INTO summit_id FROM `stud`.`summit_names` Where `summit_name` = Name;
IF (summit_id > 0) THEN
SELECT * FROM `stud`.`summits` Where `id` = summit_id;
Else
Select null;
END IF;
END;

create
definer = root@localhost procedure getSummitNamesBySummitId(IN id int)
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summit_names` WHERE `summit_id` = id LIMIT 1)) Then
SELECT * FROM `stud`.`summit_names` WHERE `summit_id` = id;
Else
Select null;
END IF;
END;

create
definer = root@localhost procedure updateSummit(IN sum_id int, IN sum_mainland varchar(45), IN sum_latitude int,
                                                    IN sum_longitude int, IN sum_height int)
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summits` WHERE `id` = sum_id LIMIT 1)) THEN
UPDATE `stud`.`summits`
SET `mainland`  = sum_mainland,
    `latitude`  = sum_latitude,
    `longitude` = sum_longitude,
    `height`    = sum_height
    WHERE `id` = sum_id;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT ID  DO NOT EXISTS';
end if;

SELECT sum_id;
END;

create
definer = root@localhost procedure updateSummitAlp(IN sum_id int, IN alp_fn varchar(45), IN alp_ln varchar(45),
                                                       IN alp_mn varchar(45), IN alp_ad date)
BEGIN
IF (DATE(alp_ad) = '0000-00-00') THEN
SET alp_ad = now();
END IF;

IF (EXISTS(SELECT `id` FROM `stud`.`summit_alps` WHERE `id` = sum_id LIMIT 1)) THEN
UPDATE `stud`.`summit_alps`
SET `first_name`  = alp_fn,
    `last_name`   = alp_ln,
    `middle_name` = alp_mn,
    `ascent_date` = alp_ad
    WHERE `id` = sum_id;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS ALPINIST ID  DO NOT EXISTS';
end if;

SELECT sum_id;
END;

create
definer = root@localhost procedure updateSummitName(IN sum_id int, IN sum_name varchar(45))
BEGIN
IF (EXISTS(SELECT `id` FROM `stud`.`summit_names` WHERE `id` = sum_id LIMIT 1)) THEN
UPDATE `stud`.`summit_names`
SET `summit_name` = sum_name
    WHERE `id` = sum_id;
ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'THIS SUMMIT NAME ID  DO NOT EXISTS';
end if;

SELECT sum_id;
END;

# CREATE TRIGGER summitAfterDelete
#     AFTER DELETE
#     ON summits FOR EACH ROW
#
# BEGIN
#
#     IF (EXISTS(SELECT id FROM summit_alps WHERE summit_id = OLD.id)) Then
#         DELETE FROM summit_alps
#                 WHERE summit_id = OLD.id;
#     end if;
#
#     IF (EXISTS(SELECT id FROM summit_names WHERE summit_id = OLD.id)) Then
#         DELETE FROM summit_names
#         WHERE summit_id = OLD.id;
#     end if;
#
# END;
