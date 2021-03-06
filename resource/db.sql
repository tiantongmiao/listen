--用户表
CREATE TABLE `user` (
  `U_ID` int(16) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '主键',
  `U_NAME` varchar(32) DEFAULT NULL COMMENT '用户名',
  `U_LOGIN_NAME` varchar(32) DEFAULT NULL COMMENT '登录名',
  `U_PWD` varchar(16) DEFAULT NULL COMMENT '密码',
  `U_WX_ID` varchar(32) DEFAULT NULL COMMENT '微信号',
  `U_WX_NAME` varchar(255) DEFAULT NULL COMMENT '微信名',
  `U_WX_IMG` varchar(255) DEFAULT NULL COMMENT '微信头像',
  `U_MOBILE_NUM` int(11) DEFAULT NULL COMMENT '手机号',
  `U_QQ_NUM` int(11) DEFAULT NULL COMMENT 'QQ号',
  `U_EMAIL` varchar(128) DEFAULT NULL COMMENT '邮箱',
  `U_INFORMATION` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `U_GENDER` tinyint(1) DEFAULT NULL COMMENT '性别',
  `U_CTIME` datetime DEFAULT NULL COMMENT '创建时间',
  `U_UTIME` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `U_TYPE` int(2) DEFAULT NULL COMMENT '用户类型(1: 普通用户, 2: 管理员)',
  `U_STATUS` int(1) DEFAULT NULL COMMENT '用户状态(0: 删除, 1: 激活, 2: 违规)',
  PRIMARY KEY (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';
--动态表
CREATE TABLE `dynamic` (
  `D_ID` int(16) NOT NULL COMMENT '动态id',
  `D_OWNER_ID` int(16) NOT NULL COMMENT '动态所有者id',
  `D_CONTENT` varchar(512) NOT NULL COMMENT '动态内容',
  `D_TYPE` int(2) DEFAULT NULL COMMENT '动态类型(1: 公开, 2: 私有, 3: 限制回复)',
  `D_CTIME` datetime DEFAULT NULL COMMENT '创建时间',
  `D_UTIME` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `D_STATUS` int(1) DEFAULT NULL COMMENT '动态状态(0: 删除, 1: 激活, 2: 违规)',
  PRIMARY KEY (`D_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='动态';
--留言板
CREATE TABLE `mboard` (
  `M_ID` int(16) NOT NULL COMMENT '留言id',
  `M_TARGET_ID` int(16) DEFAULT NULL COMMENT '留言目标',
  `M_SOURCE_ID` int(16) DEFAULT NULL COMMENT '留言来源',
  `M_CONTENT` varchar(512) DEFAULT NULL COMMENT '留言内容',
  `M_CTIME` datetime DEFAULT NULL COMMENT '创建时间',
  `M_UTIME` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `M_STATUS` int(1) DEFAULT NULL COMMENT '状态(0: 删除, 1: 激活, 2违规)',
  PRIMARY KEY (`M_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='留言板';
--回复表
CREATE TABLE `reply` (
  `R_ID` int(16) NOT NULL COMMENT '回复id',
  `R_TARGET` varchar(255) DEFAULT NULL COMMENT '回复目标',
  `R_TARGET_USER` varchar(255) DEFAULT NULL COMMENT '回复目标用户',
  `R_SOURCE` varchar(255) DEFAULT NULL COMMENT '回复来源',
  `R_SOURCE_USER` varchar(255) DEFAULT NULL COMMENT '回复来源用户',
  `R_CONTENT` varchar(255) DEFAULT NULL COMMENT '回复内容',
  `R_TYPE` int(1) DEFAULT NULL COMMENT '类型(1: 留言板回复, 2: 动态回复)',
  `R_CTIME` datetime DEFAULT NULL COMMENT '创建时间',
  `R_UTIME` datetime DEFAULT NULL COMMENT '更新时间',
  `R_STATUS` int(1) DEFAULT NULL COMMENT '状态(0: 删除, 1: 激活, 2: 违规)',
  PRIMARY KEY (`R_ID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='回复表';