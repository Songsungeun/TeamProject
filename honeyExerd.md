-- 회원
DROP TABLE IF EXISTS `HONEY_MEMBS` RESTRICT;

-- 게시판
DROP TABLE IF EXISTS `HONEY_BOARDS` RESTRICT;

-- 클라우드 저장소
DROP TABLE IF EXISTS `HONEY_CLD` RESTRICT;

-- 태그
DROP TABLE IF EXISTS `HONEY_TAG` RESTRICT;

-- 카테고리
DROP TABLE IF EXISTS `HONEY_CTG` RESTRICT;

-- 팔로우리스트
DROP TABLE IF EXISTS `HONEY_FLW` RESTRICT;

-- 회원좋아요게시물
DROP TABLE IF EXISTS `M_TO_B` RESTRICT;

-- 게시물첨부파일
DROP TABLE IF EXISTS `B_TO_C` RESTRICT;

-- 게시판 태그
DROP TABLE IF EXISTS `B_TO_T` RESTRICT;

-- 회원사진
DROP TABLE IF EXISTS `HONEY_MEMBS_PHOTOS` RESTRICT;

-- 댓글
DROP TABLE IF EXISTS `HONEY_CMTS` RESTRICT;

-- 게시판링크
DROP TABLE IF EXISTS `BOARD_LINK` RESTRICT;

-- 게시판파일
DROP TABLE IF EXISTS `BOARD_FILES` RESTRICT;

-- 회원
CREATE TABLE `HONEY_MEMBS` (
  `MB_NO`   INTEGER     NOT NULL COMMENT '회원번호', -- 회원번호
  `EMAIL`   VARCHAR(40) NOT NULL COMMENT '이메일', -- 이메일
  `MB_NICK` VARCHAR(50) NOT NULL COMMENT '별명', -- 별명
  `MB_NM`   VARCHAR(50) NOT NULL COMMENT '이름', -- 이름
  `TEL`     VARCHAR(30) NOT NULL COMMENT '전화번호', -- 전화번호
  `BIRTH`   VARCHAR(10) NULL     COMMENT '생년월일', -- 생년월일
  `PWD`     VARCHAR(50) NOT NULL COMMENT '비밀번호' -- 비밀번호
)
COMMENT '회원';

-- 회원
ALTER TABLE `HONEY_MEMBS`
  ADD CONSTRAINT `PK_HONEY_MEMBS` -- 회원 기본키
    PRIMARY KEY (
      `MB_NO` -- 회원번호
    );

-- 회원 유니크 인덱스
CREATE UNIQUE INDEX `UIX_HONEY_MEMBS`
  ON `HONEY_MEMBS` ( -- 회원
    `MB_NICK` ASC -- 별명
  );

-- 회원 유니크 인덱스2
CREATE UNIQUE INDEX `UIX_HONEY_MEMBS2`
  ON `HONEY_MEMBS` ( -- 회원
    `EMAIL` ASC -- 이메일
  );

ALTER TABLE `HONEY_MEMBS`
  MODIFY COLUMN `MB_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

ALTER TABLE `HONEY_MEMBS`
  AUTO_INCREMENT = 1;

-- 게시판
CREATE TABLE `HONEY_BOARDS` (
  `BD_NO`    INTEGER      NOT NULL COMMENT '게시판번호', -- 게시판번호
  `MB_NO`    INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  `CT_NO`    INTEGER      NOT NULL COMMENT '카테고리번호', -- 카테고리번호
  `BD_TITL`  VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
  `URL`      VARCHAR(255) NULL     COMMENT 'URL', -- URL
  `BD_CONTS` MEDIUMTEXT   NULL     COMMENT '내용', -- 내용
  `BD_CRE`   DATETIME     NOT NULL COMMENT '시간', -- 시간
  `BD_LIKE`  INTEGER      NULL     DEFAULT 0 COMMENT '좋아요', -- 좋아요
  `VIEW_CT`  INTEGER      NOT NULL DEFAULT 0 COMMENT '조회수' -- 조회수
)
COMMENT '게시판';

-- 게시판
ALTER TABLE `HONEY_BOARDS`
  ADD CONSTRAINT `PK_HONEY_BOARDS` -- 게시판 기본키
    PRIMARY KEY (
      `BD_NO` -- 게시판번호
    );

ALTER TABLE `HONEY_BOARDS`
  MODIFY COLUMN `BD_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시판번호';

ALTER TABLE `HONEY_BOARDS`
  AUTO_INCREMENT = 1;

-- 클라우드 저장소
CREATE TABLE `HONEY_CLD` (
  `CL_NO`   INTEGER      NOT NULL COMMENT '파일번호', -- 파일번호
  `MB_NO`   INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  `CL_NICK` VARCHAR(50)  NOT NULL COMMENT '별명', -- 별명
  `CL_NM`   VARCHAR(255) NOT NULL COMMENT '파일이름', -- 파일이름
  `CL_CRE`  DATETIME     NOT NULL COMMENT '등록시간', -- 등록시간
  `CL_SIZE` INTEGER      NOT NULL COMMENT '파일크기', -- 파일크기
  `CL_STUS` INTEGER      NOT NULL COMMENT '상태' -- 상태
)
COMMENT '클라우드 저장소';

-- 클라우드 저장소
ALTER TABLE `HONEY_CLD`
  ADD CONSTRAINT `PK_HONEY_CLD` -- 클라우드 저장소 기본키
    PRIMARY KEY (
      `CL_NO` -- 파일번호
    );

ALTER TABLE `HONEY_CLD`
  MODIFY COLUMN `CL_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '파일번호';

ALTER TABLE `HONEY_CLD`
  AUTO_INCREMENT = 1;

-- 태그
CREATE TABLE `HONEY_TAG` (
  `TG_NO` INTEGER      NOT NULL COMMENT '태그번호', -- 태그번호
  `TG_NM` VARCHAR(255) NOT NULL COMMENT '태그이름' -- 태그이름
)
COMMENT '태그';

-- 태그
ALTER TABLE `HONEY_TAG`
  ADD CONSTRAINT `PK_HONEY_TAG` -- 태그 기본키
    PRIMARY KEY (
      `TG_NO` -- 태그번호
    );

ALTER TABLE `HONEY_TAG`
  MODIFY COLUMN `TG_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '태그번호';

ALTER TABLE `HONEY_TAG`
  AUTO_INCREMENT = 1;

-- 카테고리
CREATE TABLE `HONEY_CTG` (
  `CT_NO` INTEGER      NOT NULL COMMENT '카테고리번호', -- 카테고리번호
  `CT_NM` VARCHAR(255) NOT NULL COMMENT '카테고리이름' -- 카테고리이름
)
COMMENT '카테고리';

-- 카테고리
ALTER TABLE `HONEY_CTG`
  ADD CONSTRAINT `PK_HONEY_CTG` -- 카테고리 기본키
    PRIMARY KEY (
      `CT_NO` -- 카테고리번호
    );

ALTER TABLE `HONEY_CTG`
  MODIFY COLUMN `CT_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '카테고리번호';

ALTER TABLE `HONEY_CTG`
  AUTO_INCREMENT = 1;

-- 팔로우리스트
CREATE TABLE `HONEY_FLW` (
  `MB_NO`  INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  `MB_NO2` INTEGER NOT NULL COMMENT '팔로우회원번호' -- 팔로우회원번호
)
COMMENT '팔로우리스트';

-- 팔로우리스트
ALTER TABLE `HONEY_FLW`
  ADD CONSTRAINT `PK_HONEY_FLW` -- 팔로우리스트 기본키
    PRIMARY KEY (
      `MB_NO`,  -- 회원번호
      `MB_NO2`  -- 팔로우회원번호
    );

-- 회원좋아요게시물
CREATE TABLE `M_TO_B` (
  `MB_NO` INTEGER NOT NULL COMMENT '회원번호', -- 회원번호
  `BD_NO` INTEGER NOT NULL COMMENT '게시판번호' -- 게시판번호
)
COMMENT '회원좋아요게시물';

-- 회원좋아요게시물
ALTER TABLE `M_TO_B`
  ADD CONSTRAINT `PK_M_TO_B` -- 회원좋아요게시물 기본키
    PRIMARY KEY (
      `MB_NO`, -- 회원번호
      `BD_NO`  -- 게시판번호
    );

-- 게시물첨부파일
CREATE TABLE `B_TO_C` (
  `BD_NO` INTEGER NOT NULL COMMENT '게시판번호', -- 게시판번호
  `CL_NO` INTEGER NOT NULL COMMENT '파일번호' -- 파일번호
)
COMMENT '게시물첨부파일';

-- 게시물첨부파일
ALTER TABLE `B_TO_C`
  ADD CONSTRAINT `PK_B_TO_C` -- 게시물첨부파일 기본키
    PRIMARY KEY (
      `BD_NO`, -- 게시판번호
      `CL_NO`  -- 파일번호
    );

ALTER TABLE `B_TO_C`
  MODIFY COLUMN `BD_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시판번호';

ALTER TABLE `B_TO_C`
  AUTO_INCREMENT = 1;

-- 게시판 태그
CREATE TABLE `B_TO_T` (
  `BD_NO` INTEGER NOT NULL COMMENT '게시판번호', -- 게시판번호
  `TG_NO` INTEGER NOT NULL COMMENT '태그번호' -- 태그번호
)
COMMENT '게시판 태그';

-- 게시판 태그
ALTER TABLE `B_TO_T`
  ADD CONSTRAINT `PK_B_TO_T` -- 게시판 태그 기본키
    PRIMARY KEY (
      `BD_NO`, -- 게시판번호
      `TG_NO`  -- 태그번호
    );

-- 회원사진
CREATE TABLE `HONEY_MEMBS_PHOTOS` (
  `MBP_NO`   INTEGER      NOT NULL COMMENT '회원사진번호', -- 회원사진번호
  `MB_NO`    INTEGER      NULL     COMMENT '회원번호', -- 회원번호
  `MBP_PATH` VARCHAR(255) NOT NULL COMMENT '회원사진경로' -- 회원사진경로
)
COMMENT '회원사진';

-- 회원사진
ALTER TABLE `HONEY_MEMBS_PHOTOS`
  ADD CONSTRAINT `PK_HONEY_MEMBS_PHOTOS` -- 회원사진 기본키
    PRIMARY KEY (
      `MBP_NO` -- 회원사진번호
    );

ALTER TABLE `HONEY_MEMBS_PHOTOS`
  MODIFY COLUMN `MBP_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원사진번호';

ALTER TABLE `HONEY_MEMBS_PHOTOS`
  AUTO_INCREMENT = 1;

-- 댓글
CREATE TABLE `HONEY_CMTS` (
  `CM_NO`    INTEGER    NOT NULL COMMENT '댓글번호', -- 댓글번호
  `BD_NO`    INTEGER    NOT NULL COMMENT '게시판번호', -- 게시판번호
  `MB_NO`    INTEGER    NOT NULL COMMENT '회원번호', -- 회원번호
  `CM_CONTS` MEDIUMTEXT NOT NULL COMMENT '댓글내용', -- 댓글내용
  `CM_CRE`   DATETIME   NULL     COMMENT '등록시간', -- 등록시간
  `CM_DEPTH` INTEGER    NOT NULL DEFAULT 0 COMMENT '댓글깊이', -- 댓글깊이
  `CM_THRD`  INTEGER    NOT NULL DEFAULT 0 COMMENT '내부번호' -- 내부번호
)
COMMENT '댓글';

-- 댓글
ALTER TABLE `HONEY_CMTS`
  ADD CONSTRAINT `PK_HONEY_CMTS` -- 댓글 기본키
    PRIMARY KEY (
      `CM_NO` -- 댓글번호
    );

ALTER TABLE `HONEY_CMTS`
  MODIFY COLUMN `CM_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '댓글번호';

ALTER TABLE `HONEY_CMTS`
  AUTO_INCREMENT = 1;

-- 게시판링크
CREATE TABLE `BOARD_LINK` (
  `URL_NO`    INTEGER      NOT NULL COMMENT 'URL번호', -- URL번호
  `MB_NO`     INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  `BD_NO`     INTEGER      NOT NULL COMMENT '게시판번호', -- 게시판번호
  `URL_ADDR`  VARCHAR(255) NULL     COMMENT 'URL주소', -- URL주소
  `URL_DESC`  MEDIUMTEXT   NULL     COMMENT 'URL내용', -- URL내용
  `URL_IMAGE` VARCHAR(255) NULL     COMMENT 'URL이미지', -- URL이미지
  `URL_TITLE` VARCHAR(255) NULL     COMMENT 'URL제목', -- URL제목
  `DETAILURL` VARCHAR(255) NULL     COMMENT '실제URL' -- 실제URL
)
COMMENT '게시판링크';

-- 게시판링크
ALTER TABLE `BOARD_LINK`
  ADD CONSTRAINT `PK_BOARD_LINK` -- 게시판링크 기본키
    PRIMARY KEY (
      `URL_NO` -- URL번호
    );

ALTER TABLE `BOARD_LINK`
  MODIFY COLUMN `URL_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT 'URL번호';

ALTER TABLE `BOARD_LINK`
  AUTO_INCREMENT = 1;

-- 게시판파일
CREATE TABLE `BOARD_FILES` (
  `FILE_NO`   INTEGER     NOT NULL COMMENT '게시판파일번호', -- 게시판파일번호
  `FILE_NAME` VARCHAR(50) NOT NULL COMMENT '파일이름', -- 파일이름
  `BD_NO`     INTEGER     NULL     COMMENT '새 컬럼3' -- 새 컬럼3
)
COMMENT '게시판파일';

-- 게시판파일
ALTER TABLE `BOARD_FILES`
  ADD CONSTRAINT `PK_BOARD_FILES` -- 게시판파일 기본키
    PRIMARY KEY (
      `FILE_NO` -- 게시판파일번호
    );

ALTER TABLE `BOARD_FILES`
  MODIFY COLUMN `FILE_NO` INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시판파일번호';

ALTER TABLE `BOARD_FILES`
  AUTO_INCREMENT = 1;

-- 게시판
ALTER TABLE `HONEY_BOARDS`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_BOARDS` -- 회원 -> 게시판
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 게시판
ALTER TABLE `HONEY_BOARDS`
  ADD CONSTRAINT `FK_HONEY_CTG_TO_HONEY_BOARDS` -- 카테고리 -> 게시판
    FOREIGN KEY (
      `CT_NO` -- 카테고리번호
    )
    REFERENCES `HONEY_CTG` ( -- 카테고리
      `CT_NO` -- 카테고리번호
    );

-- 클라우드 저장소
ALTER TABLE `HONEY_CLD`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_CLD` -- 회원 -> 클라우드 저장소
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 팔로우리스트
ALTER TABLE `HONEY_FLW`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_FLW` -- 회원 -> 팔로우리스트
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 팔로우리스트
ALTER TABLE `HONEY_FLW`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_FLW2` -- 회원 -> 팔로우리스트2
    FOREIGN KEY (
      `MB_NO2` -- 팔로우회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 회원좋아요게시물
ALTER TABLE `M_TO_B`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_M_TO_B` -- 회원 -> 회원좋아요게시물
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 회원좋아요게시물
ALTER TABLE `M_TO_B`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_M_TO_B` -- 게시판 -> 회원좋아요게시물
    FOREIGN KEY (
      `BD_NO` -- 게시판번호
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );

-- 게시물첨부파일
ALTER TABLE `B_TO_C`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_B_TO_C` -- 게시판 -> 게시물첨부파일
    FOREIGN KEY (
      `BD_NO` -- 게시판번호
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );

-- 게시물첨부파일
ALTER TABLE `B_TO_C`
  ADD CONSTRAINT `FK_HONEY_CLD_TO_B_TO_C` -- 클라우드 저장소 -> 게시물첨부파일
    FOREIGN KEY (
      `CL_NO` -- 파일번호
    )
    REFERENCES `HONEY_CLD` ( -- 클라우드 저장소
      `CL_NO` -- 파일번호
    );

-- 게시판 태그
ALTER TABLE `B_TO_T`
  ADD CONSTRAINT `FK_HONEY_TAG_TO_B_TO_T` -- 태그 -> 게시판 태그
    FOREIGN KEY (
      `TG_NO` -- 태그번호
    )
    REFERENCES `HONEY_TAG` ( -- 태그
      `TG_NO` -- 태그번호
    );

-- 게시판 태그
ALTER TABLE `B_TO_T`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_B_TO_T` -- 게시판 -> 게시판 태그
    FOREIGN KEY (
      `BD_NO` -- 게시판번호
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );

-- 회원사진
ALTER TABLE `HONEY_MEMBS_PHOTOS`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_MEMBS_PHOTOS` -- 회원 -> 회원사진
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 댓글
ALTER TABLE `HONEY_CMTS`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_HONEY_CMTS` -- 게시판 -> 댓글
    FOREIGN KEY (
      `BD_NO` -- 게시판번호
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );

-- 댓글
ALTER TABLE `HONEY_CMTS`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_HONEY_CMTS` -- 회원 -> 댓글
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 게시판링크
ALTER TABLE `BOARD_LINK`
  ADD CONSTRAINT `FK_HONEY_MEMBS_TO_BOARD_LINK` -- 회원 -> 게시판링크
    FOREIGN KEY (
      `MB_NO` -- 회원번호
    )
    REFERENCES `HONEY_MEMBS` ( -- 회원
      `MB_NO` -- 회원번호
    );

-- 게시판링크
ALTER TABLE `BOARD_LINK`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_BOARD_LINK` -- 게시판 -> 게시판링크
    FOREIGN KEY (
      `BD_NO` -- 게시판번호
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );

-- 게시판파일
ALTER TABLE `BOARD_FILES`
  ADD CONSTRAINT `FK_HONEY_BOARDS_TO_BOARD_FILES` -- 게시판 -> 게시판파일
    FOREIGN KEY (
      `BD_NO` -- 새 컬럼3
    )
    REFERENCES `HONEY_BOARDS` ( -- 게시판
      `BD_NO` -- 게시판번호
    );
    
    
-- 회원사진
ALTER TABLE `honeydb`.`HONEY_MEMBS_PHOTOS` 
CHANGE COLUMN `MBP_PATH` `MBP_PATH` VARCHAR(255) NULL DEFAULT 'defaultUserImg.svg' COMMENT '회원사진경로' ;

