var Newst = (function($, $n) {
    return $.extend($n, {

        notVazhnoCountries: ['MX','CO','US','AT','UA','AU','PT','FR','KZ','BY','MD','UZ','KG','AZ','TJ','DE','LV','LT','KG','IT','BG','GE','ES','EE','AM','GR','CY','RO','CH','HU','BE','RU','VN','ID','MY','TH'],

        getNanoRequest: function (request) {
            let locale = $('#hostLocale').val();
            let matches = locale.match(new RegExp("(id_ID|th_TH|es_.{2}|vi_VN)"));
            if (matches) {
                return "/news-no-context/all";
            }

            return request;
        },

        getCookie: function (name) {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        },

        setCookie: function (name, value, options = {}) {

            if (options.path === undefined) {
                options['path'] = '/';
            }

            if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
            }

            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
        },

        deleteCookie: function (name) {
            this.setCookie(name, "", {
                'max-age': -1
            })
        },

        isFirstPageLoad: function (pageName) {
            if (this.getCookie(pageName) === undefined) {
                this.setCookie(pageName, 1, {'max-age': 86400});
                return true;
            }

            return false;
        },

        isVazhno: function () {
            return !this.notVazhnoCountries.includes($('#countryIso').val());
        },


        checkSpecialDisable: function (sourseList) {
            return sourseList.includes(Number($('#sourceId').val()))
                || ($('input').is('#backCloseLock') && ($('#backCloseLock').val() == 0))
                || (($('#sourceId').val() == 469) && ($('#siteId').val() == 27249));
        },

        setStaticNewsData: function (block, data) {
            var counter = 0;
            var date = new Date();
            var self = this;
            $(block).find('a.fint:visible').each(function (i) {
                if (counter < data.length) {
                    if ($(this).find('.fint__image').hasClass('fint__image_big')) {
                        $(this).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_16x9.') ? match : '_16x9.'}));
                    } else {
                        $(this).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_4x3.') ? match : '_4x3.'}));
                    }

                    $(this).attr('href', data[counter].link);
                    $(this).find('div.fint__title').text(data[counter].title);
                    if ($(this).find('.s_date').length > 0) {
                        date.setTime(data[counter].newsDt * 1000);
                        $(this).find('.s_date').text(dateFormat(date, 'd mmmm'));
                    }
                    counter++;
                }
            });
        },

        addCatNewPlacements: function (placement, data, appendToSelector) {
            var counter = 0;
            var date = new Date();
            var self = this;
            $.each(placement, function (index, value) {
                $('#row_' + value + ' a.fint:visible').each(function (i) {
                    if (counter < data.length) {
                        if ($(this).find('.fint__image').hasClass('fint__image_big')) {
                            $(this).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_16x9.') ? match : '_16x9.'}));
                        } else {
                            $(this).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_4x3.') ? match : '_4x3.'}));
                        }

                        $(this).attr('href', data[counter].link);
                        $(this).find('div.fint__title').text(data[counter].title);
                        if ($(this).find('.s_date').length > 0) {
                            date.setTime(data[counter].newsDt * 1000);
                            $(this).find('.s_date').text(dateFormat(date, 'd mmmm'));
                        }
                        counter++;
                    } else {
                        $(this).hide();
                    }
                });
                $('#row_' + value).children().each(function (index) {
                    $(appendToSelector).append($(this).clone());
                });
            });
        },

        setSelectedNewsData: function (elements, data) {
            var counter = 0;
            var date = new Date();
            var self = this;
            $.each(elements, function (i, value) {
                if (counter < data.length) {
                    if ($(value).find('.fint__image').hasClass('fint__image_big')) {
                        $(value).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_16x9.') ? match : '_16x9.'}));
                    } else {
                        $(value).find('img').attr('src', data[counter].imgUrlLarge.replace('.', function (match, offset, str) {return str.includes('_4x3.') ? match : '_4x3.'}));
                    }

                    $(value).attr('href', data[counter].link);
                    $(value).find('div.fint__title').text(data[counter].title);
                    if ($(value).find('.s_date').length > 0) {
                        date.setTime(data[counter].newsDt * 1000);
                        $(value).find('.s_date').text(dateFormat(date, 'd mmmm'));
                    }
                    counter++;
                }
            });
        },

        getWidthSize: function () {
            var widthSize = 4;
            if ($('.hide-on-360').css('display') == "none") {
                widthSize = -1;
            } else if ($('.hide-on-560').css('display') == "none") {
                widthSize = 0;
            } else if ($('.hide-on-768').css('display') == "none") {
                widthSize = 1;
            } else if ($('.hide-on-1000').css('display') == "none") {
                widthSize = 2;
            } else if ($('.hide-on-1200').css('display') == "none") {
                widthSize = 3;
            }

            return widthSize;
        },

        getCountOfTsrsInArray: function (data) {
            var count = 0;
            $.each(data, function (index, value) {
                $('#row_' + value + ' a.fint:visible').each(function (i) {
                    count++;
                })
            });
            return count;
        },

        setTImage: function (img, val) {
            $(img).attr('src', val);
        },

        setTsrIntoBottomText: function (data, position, topPosition) {
            $('#row_top2_news >> a.fint:visible,#row_top2_news > a.fint:visible').each(function (index) {
                Newst.setTImage($(this).find('img'), data[index].image);
                $(this).attr('href', data[index].url);
                $(this).attr('data-id', data[index].id);
                $(this).find('.fint__title').first().text(data[index].text);
            });

            var insertedPosition = 0;
            var positions = [];
            var allTextCount = 0;
            $('.article__content > p').each(function (i) {
                positions.push($(this).text().length);
                allTextCount += $(this).text().length;
            });

            if (allTextCount > 1000) {
                var lettersCount = 0;
                for (var i = positions.length - 1; i >= 0; i--) {
                    lettersCount += positions[i];
                    if ((lettersCount > position) && (allTextCount - topPosition - lettersCount > position)) {
                        $($('.article__content > p')[i - 1]).after($('#row_top2_news').children().clone());
                        insertedPosition = allTextCount - lettersCount;
                        break;
                    }
                }
            }
            if (insertedPosition == 0) {
                $('.article__content > p').last().before($('#row_top2_news').children().clone());
            }

            return insertedPosition;
        },

        setTsrIntoText: function (data, position) {
            $('#row_top1_news >> a.fint:visible,#row_top1_news > a.fint:visible').each(function (index) {
                Newst.setTImage($(this).find('img'), data[index].image);
                $(this).attr('href', data[index].url);
                $(this).attr('data-id', data[index].id);
                $(this).find('.fint__title').first().text(data[index].text);
            });

            var lettersCount = 0;
            var insertedPosition = 0;
            $('.article__content > p').each(function (i) {
                if ((lettersCount < position) && ((lettersCount + $(this).text().length) > position)) {
                    if (position - lettersCount > lettersCount + $(this).text().length - position) {
                        $(this).after($('#row_top1_news').children().clone());
                        insertedPosition = lettersCount + $(this).text().length;
                    } else {
                        if (lettersCount > 0) {
                            $($('.article__content > p')[i - 1]).after($('#row_top1_news').children().clone());
                            insertedPosition = lettersCount;
                        } else {
                            $(this).after($('#row_top1_news').children().clone());
                            insertedPosition = lettersCount + $(this).text().length;
                        }
                    }
                }
                lettersCount += $(this).text().length;
            });
            if (insertedPosition == 0) {
                $('.article__content > p').first().after($('#row_top1_news').children().clone());
            }
            return insertedPosition;
        },

        setPlacementTsrData: function (selector, data, square) {
            var counter = 0;
            $(selector).each(function (index) {
                var template = $(this).attr('data-template');
                $('#row_' + template + ' a.fint:visible').each(function (i) {
                    if (counter < data.length) {
                        Newst.setTImage($(this).find('img'), data[counter].image);
                        $(this).attr('href', data[counter].url);
                        $(this).attr('data-id', data[counter].id);
                        $(this).find('.fint__title').first().text(data[counter].text);
                        counter++;
                    }
                });
                $(this).replaceWith($('#row_' + template).children().clone());
            });
            return _.rest(data, counter);
        },

        addNewPlacements: function (placement, data, appendToSelector) {
            var counter = 0;
            $.each(placement, function (index, value) {
                $('#row_' + value + ' a.fint:visible').each(function (i) {
                    if (counter < data.length) {
                        Newst.setTImage($(this).find('img'), data[counter].image);
                        $(this).attr('href', data[counter].url);
                        $(this).attr('data-id', data[counter].id);
                        $(this).find('div.fint__title').first().text(data[counter].text);
                        counter++;
                    } else {
                        $(this).hide();
                    }
                });
                $('#row_' + value).children().each(function (index) {
                    $(appendToSelector).append($(this).clone());
                });
            });
        },

        addNanoNewPlacements: function (placement, data, appendToSelector) {
            var counter = 0;
            var date = new Date();
            $.each(placement, function (index, value) {
                $('#row_' + value + ' a.fint:visible').each(function (i) {
                    if (counter < data.length) {
                        $(this).find('img').attr('src', data[counter].imgUrlSmall);
                        $(this).attr('href', data[counter].link);
                        $(this).find('div.fint__title').first().text(data[counter].title);
                        if (($(this).find('.s_date').length > 0) && (Number.isInteger(data[counter].newsDt))) {
                            date.setTime(data[counter].newsDt * 1000);
                            $(this).find('.s_date').text(dateFormat(date, 'd mmmm'));
                        } else {
                            $(this).find('.fint__post-time').hide();
                        }
                        counter++;
                    } else {
                        $(this).hide();
                    }
                });
                $('#row_' + value).children().each(function (index) {
                    $(appendToSelector).append($(this).clone());
                });
            });
            return counter;
        },

        setVisitsToElms: function (from, to, selector) {
            var views = [];
            $(selector).each(function (index) {
                if ($(this).text().length == 0) {
                    views.push(_.random(from, to));
                }
            });

            views = _.sortBy(views, function (elm) {
                return -elm;
            });

            var cnt = 0;
            $(selector).each(function (index) {
                if ($(this).text().length == 0) {
                    $(this).text(views[cnt] + 'k');
                    cnt++;
                }
            });
        },

        setTimeToElms: function (blockSelector, page) {
            var timeElements = $(blockSelector).find('.s_date:empty');
            var from = page * 8;
            var to = from + 8;
            var now = new Date();
            var times = [];
            for (var i=0; i<timeElements.length; i++) {
                var shift = _.random(from * 60 * 60 * 1000, to * 60 * 60 * 1000);
                var tmpTime = new Date();
                tmpTime.setTime(now.getTime() - shift + 60 * 1000);
                times.push(tmpTime);
            }

            times = _.sortBy(times, function (elm) {
                return -elm.getTime();
            });

            var tt = new Date();
            timeElements.each(function (index) {
                var time = '';

                tt.setTime(now.getTime() - times[index].getTime());
                if (tt.getUTCHours() > 0) {
                    time += tt.getUTCHours() + ' ' + Newst.num2str(tt.getUTCHours(), ['час', 'часа', 'часов']);
                } else {
                    time += tt.getMinutes() + ' ' + Newst.num2str(tt.getMinutes(), ['минуту', 'минуты', 'минут']);
                }
                time += ' назад';

                if (page >= 3) {
                    time = 'вчера';
                }

                $(this).text(time);
            });
        },

        randomInteger: function (min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        },

        num2str: function (n, text_forms) {
            n = Math.abs(n) % 100; var n1 = n % 10;
            if (n > 10 && n < 20) { return text_forms[2]; }
            if (n1 > 1 && n1 < 5) { return text_forms[1]; }
            if (n1 == 1) { return text_forms[0]; }
            return text_forms[2];
        },

        getCountOfTsrs: function (selector) {
            var count = 0;
            $(selector).each(function (index) {
                count += $('a.fint:visible').length;
            });
            return count;
        },



        setPlacementNanoData: function (selector, data) {
            var counter = 0;
            $(selector).each(function (index) {
                var template = $(this).attr('data-template');
                $('#row_' + template + ' .t-elm').each(function (i) {
                    $(this).css({'display': 'block'});
                    if ($(this).is(':visible') && (counter < data.length)) {
                        if ($(this).find('a').hasClass('__big')) {
                            $(this).find('img').attr('src', data[counter].imgUrlSmall)
                        } else {
                            $(this).find('img').attr('src', data[counter].imgUrlSmall)
                        }

                        $(this).find('a').attr('href', data[counter].link);

                        $(this).find('span.t-title').first().text(data[counter].title);

                        counter++;
                    } else {
                        $(this).css({'display': 'none'});
                    }
                });
                $(this).replaceWith($('#row_' + template).children().clone());
            });
        },

        addNewNanoPlacements: function (placement, data, appendToSelector) {
            var counter = 0;
            $.each(placement, function (index, value) {
                $('#row_' + value + ' .t-elm').each(function (i) {
                    $(this).css({'display': 'block'});
                    if ($(this).is(':visible') && (counter < data.length)) {
                        if ($(this).find('a').hasClass('__big')) {
                            $(this).find('img').attr('src', data[counter].imgUrlSmall)
                        } else {
                            $(this).find('img').attr('src', data[counter].imgUrlSmall)
                        }

                        $(this).find('a').attr('href', data[counter].link);

                        $(this).find('span.t-title').first().text(data[counter].title);

                        counter++;
                    } else {
                        $(this).css({'display': 'none'});
                    }
                });
                $(appendToSelector).append($('#row_' + value).children().first().clone());
            });
        },

        setPlacementMoreNewsData: function (selector, data, path, appendToSelector) {
            var counter = 0;
            var nestCount = 0;
            $(selector).each(function (index) {
                var template = $(this).attr('data-template');
                $('#row_' + template).find('a.fint:visible').each(function (i) {
                    if (counter < data.length) {
                        $(this).find('img').attr('src', data[counter].imgUrlSmall);
                        $(this).attr('href', data[counter].link);
                        $(this).find('div.fint__title').first().text(data[counter].title);
                        counter++;
                        nestCount = 0;
                    } else {
                        if ($(this).parent().parent().hasClass('fints-nest')) {
                            nestCount++;
                        }
                        $(this).addClass('hide');
                        if (nestCount == 6) {
                            $(this).parent().parent().addClass('hide');
                        }
                    }
                });
                $(appendToSelector).append($('#row_' + template).children().first().clone());
                $('#row_' + template).find('a.fint').each(function (i) {
                    $(this).removeClass('hide');
                    if ($(this).parent().parent().hasClass('fints-nest')) {
                        $(this).parent().parent().removeClass('hide');
                    }
                });
            });
        },


        makeRequest: function (url, data, dataType, callback, withWait, failCallback){
            if (withWait) {
                $.showAjaxWait();
            }
            $.post(
                url,
                data,
                function (){
                    if (Newst.isset(arguments[0]) && (((typeof arguments[0] == 'object') && Newst.isset(arguments[0].loginError))
                        || ((typeof arguments[0] == 'string') && arguments[0].indexOf('loginError') >= 0))) {
                        document.location.href = document.location.pathname + document.location.search;
                        return;
                    }
                    if (Newst.isset(arguments[0].errors)) {
                        $.showErrorBox(Newst.errorProcessing(arguments[0].errors));
                    }
                    if (callback) {
                        callback.apply(this, arguments)
                    }
                },
                dataType
            ).fail(function() {
                $.showErrorBox("Произошла непредвиденная ошибка, если она повторяется, свяжитесь со службой поддержки");
                if (failCallback) {
                    failCallback.apply(this, [{'fatalError' : 1}])
                }
            })
            .always(function() {
                if (withWait) {
                    $.hideAjaxWait();
                }
            });
        },

        dataDT: [],

        isset: function() {
            if (typeof(arguments[0]) != "undefined") {
                return true;
            }
            return false;
        },
        errorProcessing: function (res) {
            var errors = '';
            if(typeof res == 'string'){
                errors = res;
            } else {
                $.each(res, function (key, val) {
                    if(typeof val == 'string'){
                        errors += val + "<br />";
                    } else {
                        $.each(val, function (k, v) {
                            errors += v + "<br />";
                        });
                    }
                });
            }
            return errors;
        },

        modalHide: function($modal) {
            $modal.fadeOut('fast', function () {
                if (!$('.modal:visible').length) {
                    $('body').removeClass('modal-show');
                }

            });
        },

        modalRefresh: function() {
            $.each($('.modal:visible'), function() {
                var modalBlock = $(this).find('.modal-block'),
                    width = parseInt(modalBlock.width()),
                    height = parseInt(modalBlock.height());
                if ($(window).height() > height + 20) {
                    modalBlock.addClass('modal-top').removeClass('margin-t-b').css('margin-top', -1 * (height / 2));
                }
                else {
                    modalBlock.addClass('margin-t-b').removeClass('modal-top');
                }
                if ($(window).width() > width) {
                    modalBlock.addClass('modal-left').removeClass('margin-l').css('margin-left', -1 * (width / 2));
                }
                else {
                    modalBlock.addClass('margin-l').removeClass('modal-left');
                }
            });
        },

        modalShow: function(modal) {
            modal.fadeIn('fast');
            $('body').addClass('modal-show');
            Newst.modalRefresh();
        }

    });

})(jQuery, Newst || {});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.exists = function() {
   return $(this).length;
};

$.exists = function(selector) {
   return ($(selector).length > 0);
};

$.showAjaxWait = function() {
    $('body').append('<div id="ajaxWait" style="background:#ddd;top:0;left:0;right:0;bottom:0;z-index:10000;position:fixed;opacity: 0.5;"><table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0"><tr><td align="center" valign="middle" style="vertical-align: middle;"><img src="/img/ajax-loader.gif"></td></tr></table></div>');
};

$.hideAjaxWait = function() {
    $('#ajaxWait').remove();
};

$.showErrorBox = function(errors){
    var el = $('<div id="modalErrorBox" class="modal"><div class="modal-block"><div class="icon-close error"></div><div class="title error">Ошибка</div><div class="content">' + errors + '<div class="clr"></div></div></div></div>');
    $('body').append(el);
    if (el.length){
        Newst.modalShow(el);

        $('#modalErrorBox, .icon-close').on('click', function(event){
            Newst.modalHide(el);
            el.remove();
        });
    }
};

$.showSuccessBox = function(msg){
    var el = $('<div id="modalMsgBox" class="modal"><div class="modal-block"><div class="icon-close"></div><div class="title">Сообщение</div><div class="content">' + msg + '<div class="clr"></div></div></div></div>');
    $('body').append(el);
    if (el.length){
        Newst.modalShow(el);

        $('#modalMsgBox, .icon-close').on('click', function(event){
            Newst.modalHide(el);
            el.remove();
        });
    }
};

$.showInfoBox = function(msg){
    $.showSuccessBox(msg);
};

$.showCautionConfirmBox = function () {
    var el = $('#modal-confirm');
    if (el.length) {
        Newst.modalShow(el);

        $('#modal-confirm .icon-close').on('click', function (event) {
            Newst.modalHide(el);
        });
    }
};

$.dateDMYFormat = function(date) {
    console.log('date = ' + date);
    var sDate = '';
    if (date.length > 0) {

        var aDatetime = date.split(' ');
        if (aDatetime[0].length > 0)
        {
            var aDate = aDatetime[0].split('-');
            sDate = aDate[2] + '.' + aDate[1] + '.' + aDate[0] + ' ' + aDatetime[1];
        }
    }
    return sDate;
};