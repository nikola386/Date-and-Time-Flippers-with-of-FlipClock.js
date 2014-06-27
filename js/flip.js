var currentDate = new Date();

        $(document).ready(function () {
            var year = $('.year').FlipClock(currentDate.getFullYear(), {
                clockFace: 'Counter'
            });

            var month = $('.month').FlipClock(new Date().getUTCMonth() + 1, {
                clockFace: 'Counter',
                callbacks: {
                    interval: function () {
                        if (month.time.time === 1) {
                            month.setTime(1);
                            year.setTime(AddDate(new Date(), 1, "Y").getFullYear());
                        }
                    }
                }
            });

            var day = $('.day').FlipClock(new Date().getUTCDate(), {
                clockFace: 'Counter',
                callbacks: {
                    interval: function () {
                        if (clock.time.time === 1 && day.time.time === 1) {
                            day.setTime(1);
                            month.setTime(AddDate(new Date(), 1, "M").getUTCMonth() + 1);
                            month.timer._interval();
                        }
                    }
                }
            });

            var clock = $('.clock').FlipClock(86390, {
                clockFace: 'HourlyCounter',
                callbacks: {
                    interval: function () {
                        var time = clock.getTime();
                        if (time.time === 86400) {
                            clock.setTime(0);
                            day.setTime(AddDate(new Date(), 1, "D").getUTCDate());
                            day.timer._interval();
                        }
                    }
                }
            });
        });

        function AddDate(oldDate, offset, offsetType) {
            var year = parseInt(oldDate.getFullYear());
            var month = parseInt(oldDate.getMonth());
            var date = parseInt(oldDate.getDate());
            var hour = parseInt(oldDate.getHours());
            var newDate;
            switch (offsetType) {
                case "Y":
                case "y":
                    newDate = new Date(year + offset, month, date, hour);
                    break;

                case "M":
                case "m":
                    newDate = new Date(year, month + offset, date, hour);
                    break;

                case "D":
                case "d":
                    newDate = new Date(year, month, date + offset, hour);
                    break;
            }
            return newDate;
        }