/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const Write = require('../models/write');
const Time = require('../models/time');
// const userSchema = require('../models/write');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalError = require('../errors/InternalError');
const ConflictError = require('../errors/ConflictError');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: 'servicesmpt3@gmail.com',
    pass: 'Gorod48.ru',
  },
});

module.exports.getDoctorsWrite = (req, res, next) => {
  const owner = req.user._id;
  console.info(owner);
  Write.find({ owner })
    .then((write) => res.status(200).send(write))
    .catch((err) => next(new InternalError(err)));
};
module.exports.getDoctorsWriteRead = (req, res, next) => {
  console.info(req.user._id);
  const id = req.user._id;
  Write.find({ id })
    .then((write) => res.status(200).send(write))
    .catch((err) => next(new InternalError(err)));
};

module.exports.getDoctorsTime = (req, res, next) => {
  console.info(req.body.time);
  const { time } = req.body;
  console.info(time);
  Time.findOne({ date: time })
    .then((write) => res.status(200).send(write))
    .catch((err) => next(new InternalError(err)));
};

module.exports.writeDoctor = (req, res, next) => {
  console.info(req.body);
  const {
    dateBirth, doctor, dateWtire, time, name, family, owner,
  } = req.body;
  Write.create({
    dateBirth, doctor, dateWtire, time, name, family, owner,
  })
    .then((movie) => {
      // eslint-disable-next-line brace-style
      res.status(200).send(movie); })
    .catch((err) => {
      console.info(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переднаны некорректные данные'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Данный фильм уже имеется в коллекции'));
      } else {
        next(new InternalError(err));
      }
    });
};
module.exports.writeMedical = (req, res) => {
  const {
    dateBirth, pol, weight, growth, ageWrire, getSick,
  } = req.body;
  const itm = (weight / (growth / 100 * 2));
  if (ageWrire >= 50 && ageWrire < 65 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 4 });
  } else if (ageWrire >= 50 && ageWrire < 65 && itm > 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 3 });
  } else if (ageWrire >= 65 && ageWrire < 75 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 5 });
  } else if (ageWrire >= 65 && ageWrire < 75 && itm > 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 4 });
  } else if (ageWrire >= 65 && ageWrire < 75 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 3 });
  } else if (ageWrire >= 65 && ageWrire < 75 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 4 });
  } else if (ageWrire >= 75 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 5 });
  } else if (ageWrire >= 75 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 4 });
  } else if (ageWrire >= 75 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 6 });
  } else if (ageWrire >= 75 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 5 });
  } else if (ageWrire >= 50 && ageWrire < 65 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 3 });
  } else if (ageWrire >= 50 && ageWrire < 65 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 4 });
  } else if (ageWrire >= 40 && ageWrire < 50 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 3 });
  } else if (ageWrire >= 40 && ageWrire < 50 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 2 });
  } else if (ageWrire >= 40 && ageWrire < 50 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 3 });
  } else if (ageWrire >= 40 && ageWrire < 50 && itm > 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 2 });
  } else if (ageWrire >= 20 && ageWrire < 40 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 2 });
  } else if (ageWrire >= 20 && ageWrire < 40 && itm > 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 1 });
  } else if (ageWrire >= 20 && ageWrire < 40 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 2 });
  } else if (ageWrire >= 20 && ageWrire < 40 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 1 });
  } else if (ageWrire <= 20 && itm < 30 && getSick === 'Нет') {
    res.status(200).send({ visits: 1 });
  } else if (ageWrire <= 20 && itm < 30 && getSick === 'Да') {
    res.status(200).send({ visits: 1 });
  } else if (ageWrire <= 20 && itm > 30 && getSick === 'Да') {
    res.status(200).send({ visits: 1 });
  } else {
    res.status(200).send({ message: 'Возникло исключение' });
  }
  // Write.create({
  //   dateBirth, pol, weight, growth, ageWrire, getSick,
  // })
  //   .then((movie) => res.status(200).send(movie))
  //   .catch((err) => {
  //     console.info(err);
  //     if (err.name === 'ValidationError') {
  //       next(new BadRequestError('Переднаны некорректные данные'));
  //     } else if (err.name === 'MongoError' && err.code === 11000) {
  //       next(new ConflictError('Данный фильм уже имеется в коллекции'));
  //     } else {
  //       next(new InternalError(err));
  //     }
  //   });
};
module.exports.writeLogistic = (req, res, next) => {
  console.info(req.body);
  const {
    medicalHome, timeYear, countPatient, latitude, longitude,
  } = req.body;
  if (medicalHome === 'Липецкая городская поликлиника № 1') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:01мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:30мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 2') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:24мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:20мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:39мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:08мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:24мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:20мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:39мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:08мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:08мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '58мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:18мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:38мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '52мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '47мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:04мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:17мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '52мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '47мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:14мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 3') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '38мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '40мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '45мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '38мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '40мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '45мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '36мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '39мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '36мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '39мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '30мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '32мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '38мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 4') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '38мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '40мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '45мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '38мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '40мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '45мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '36мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '39мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '35мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '36мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '39мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '30мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '32мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '33мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '38мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 5') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:22мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:57мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:01мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:30мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 6') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:01мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:30мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else if (medicalHome === 'Липецкая городская поликлиника № 7') {
    const day = new Date();
    const time = `${day.getHours()}:${day.getMinutes()}:${day.getSeconds()}`;
    if (time > '16:00:00' && time < '19:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time > '07:30:00' && time < '09:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:15мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:35мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '2ч:03мин' });
      }
    } else if (time >= '09:30:00' && time <= '16:00:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '1ч:01мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:10мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:30мин' });
      }
    } else if (time >= '19:00:00' && time <= '23:59:59') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else if (time >= '00:00:00' && time <= '07:30:00') {
      if (timeYear === 'Весна') {
        res.status(200).send({ time: '50мин' });
      } else if (timeYear === 'Лето') {
        res.status(200).send({ time: '45мин' });
      } else if (timeYear === 'Осень') {
        res.status(200).send({ time: '1ч:02мин' });
      } else if (timeYear === 'Зима') {
        res.status(200).send({ time: '1ч:10мин' });
      }
    } else {
      res.status(200).send({ time: 'Переданы некорректные данные' });
    }
  } else {
    res.status(200).send({ time: 'Возникло исключение' });
  }
  // Write.create({
  //   dateBirth, doctor, dateWtire, time, name, family, owner,
  // })
  //   .then((movie) => res.status(200).send(movie))
  //   .catch((err) => {
  //     console.info(err);
  //     if (err.name === 'ValidationError') {
  //       next(new BadRequestError('Переднаны некорректные данные'));
  //     } else if (err.name === 'MongoError' && err.code === 11000) {
  //       next(new ConflictError('Данный фильм уже имеется в коллекции'));
  //     } else {
  //       next(new InternalError(err));
  //     }
  //   });
};

module.exports.deleteMovies = (req, res, next) => {
  Write.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Не найден запись по переданному id'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Это не ваш запись'));
      }
      return movie.remove()
        .then((result) => {
          // eslint-disable-next-line brace-style
          res.send(result); });
    })
    .catch((err) => {
      console.info(err);
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalError(err));
      }
    });
};
