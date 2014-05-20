<?php
/**
 * Created by PhpStorm.
 * User: jerome
 * Date: 20/05/14
 * Time: 11:17
 */

namespace Glow\SiteBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class ArticleController
{
    /**
     * @param Request $request
     * @param string $slug
     * @return array
     *
     * @Route("/{slug}", name="glow_site_article_view")
     * @Template()
     */
    public function viewAction(Request $request, $slug)
    {
        return array();
    }
} 