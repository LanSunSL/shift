package cn.mldn.shift.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import cn.mldn.util.action.abs.AbstractBaseAction;

@Controller
public class IndexAction extends AbstractBaseAction {
	@RequestMapping("/pages/back/index")
	public ModelAndView index() {
		ModelAndView mav = new ModelAndView(super.getUrl("index.page"));
		return mav;
	} 
}
